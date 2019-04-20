import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAuG0KUvonuqUa9gUJ3XuoovDiQ-UfQpDg",
  authDomain: "pokemon-dc430.firebaseapp.com",
  databaseURL: "https://pokemon-dc430.firebaseio.com",
  projectId: "pokemon-dc430",
  storageBucket: "pokemon-dc430.appspot.com",
  messagingSenderId: "772293032793"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
