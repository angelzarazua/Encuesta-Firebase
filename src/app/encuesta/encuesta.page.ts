import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Network } from '@ionic-native/network/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  formEncuesta: FormGroup;
  ref=firebase.database().ref();
  datosPendientes: any = []

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private network: Network,
    private toastController: ToastController
  ) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :/');
    });

    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.storage.forEach(rispons=>{
            let insertar = this.ref.push();
            insertar.set(rispons);
          })
          this.storage.clear()
          this.presentToast("Datos Sincronizado")
          console.log('Hay Wifi, wohhhh!');
        }
      }, 3000);
    });
    }

  ngOnInit() {
    this.formEncuesta=this.formBuilder.group({
      'nombre':['', Validators.required],
      'edad' : ['', Validators.required],
      'sexo':['', Validators.required],
      'ocupacion':['', Validators.required],
      'ciudad':['', Validators.required]
    });
  }

  guardar(): void{
    console.log("Mis datos: ", this.formEncuesta.value);

    if(this.network.type=='wifi'){
      let insertar=this.ref.push();
      insertar.set({
        nombre: this.formEncuesta.get('nombre').value,
        edad: this.formEncuesta.get('edad').value,
        sexo: this.formEncuesta.get('sexo').value,
        ocupacion: this.formEncuesta.get('ocupacion').value,
        ciudad: this.formEncuesta.get('ciudad').value,
      })
      this.presentToast("Datos guardados en la nube")
      this.formEncuesta.reset()
    }
    else{
      let guardadoLocal = {
        'nombre': this.formEncuesta.get('nombre').value,
        'edad': this.formEncuesta.get('edad').value,
        'sexo': this.formEncuesta.get('sexo').value,
        'ocupacion': this.formEncuesta.get('ocupacion').value,
        'ciudad': this.formEncuesta.get('ciudad').value,
      }
      this.presentToast("Guardado localmente")
      this.storage.set(this.formEncuesta.get('nombre').value, guardadoLocal)
      this.formEncuesta.reset()
    }
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
