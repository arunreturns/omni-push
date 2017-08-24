import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseService } from './../../services/FirebaseService';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  LoginForm : FormGroup;
  ErrorMsg : string;
  ExistingUser: boolean = true;
  FirebaseAuth: any;
  FirebaseDB: any;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              public firebaseService: FirebaseService) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.FirebaseAuth = firebaseService.firebaseAuth;
    this.FirebaseDB = firebaseService.firebaseDatabase;
    this.FirebaseAuth.onAuthStateChanged(this.authChangeHandler.bind(this))
  }

  authChangeHandler(user){
    console.log("[Inside authChangeHandler]")
    if (user) {
      console.log('[Logged In]', user)
      this.navCtrl.push(TabsPage, {
        uid: user.uid
      })
    }
    this.firebaseService.User = user;
  }

  handleAuthSuccess(mode, user) {
    if ( user ) {
      console.log(mode + ":" + user);
      this.FirebaseDB.ref("/" + user.uid).push({})
    }
  }

  handleAuthError(mode, error){
    console.log("Error during " + mode + ":", error)
    this.ErrorMsg = error.message;
  }

  login(){
    let { Email, Password } = this.LoginForm.value;
    this.FirebaseAuth.signInWithEmailAndPassword(Email, Password)
      .then(this.handleAuthSuccess.bind(this, 'Login'))
      .catch(this.handleAuthError.bind(this, 'Login'));
  }

  signup(){
    let { Email, Password } = this.LoginForm.value;
    this.FirebaseAuth.createUserWithEmailAndPassword(Email, Password)
      .then(this.handleAuthSuccess.bind(this, 'Login'))
      .catch(this.handleAuthError.bind(this, 'Signup'));
  }

  forgotPassword(){
    
  }
}
