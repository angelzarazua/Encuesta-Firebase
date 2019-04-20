import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ref = firebase.database().ref();
  pokemons: any = []

  constructor(
    private alertController : AlertController
  ){
    this.ref.on('value',response =>{
      let datos = snapshotToArray(response)
      console.log(datos);
      this.pokemons = datos
      console.log(datos)
    })

    /*firebase.database().ref('LYgWfjl8qGFbxMtHBuJ').on({
      console.log(response);
      let datos = snapshotToObject(response)
      console.log(datos)
    })*/

    /*let data = {
      name: 'Pichu'
    };
    firebase.database().ref().update(data)*/
  }

  delete(pokemon:any){
    console.log(pokemon.key)
    firebase.database().ref(pokemon.key).remove()
  }

  async add(){
    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons:[
        {
          text: 'Agregar',
          handler: (data) =>{
            console.log(' Confirm Ok', data);
            let insert = this.ref.push()
            insert.set(data)
          }
        }
      ]
    });

    await alert.present();

  }

  async edit(pokemon:any){
    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: pokemon.name
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler: (data) =>{
            console.log(' Confirm Ok', data);
            firebase.database().ref(pokemon.key).update(data)
          }
        }
      ]
    });

    await alert.present();

  }


}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}



export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}