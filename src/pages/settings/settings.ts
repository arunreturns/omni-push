import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseService } from './../../services/FirebaseService';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  User: any;
  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    this.User = firebaseService.firebaseAuth.currentUser;
    console.log(this.User)
  }

  navigateToLogin(){
    this.navCtrl.push(LoginPage)
  }
  logout() {
    this.firebaseService.firebaseAuth.signOut()
      .then(this.navigateToLogin.bind(this));
  }

}
