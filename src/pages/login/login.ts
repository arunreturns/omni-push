import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseService } from './../../services/FirebaseService';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
  ngOnInit() {
    
  }
  LoginForm : FormGroup;
  ErrorMsg : string = "Error Message";
  ExistingUser: boolean;
  FirebaseAuth: any;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              public firebaseService: FirebaseService) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.FirebaseAuth = firebaseService.firebaseAuth;
    let Self = this;
    this.FirebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('[Logged In]', user)
        Self.navCtrl.push(TabsPage, {
          uid: user.uid
        })
      }
    })
  }

  login(){
    let Self = this;
    let { Email, Password } = this.LoginForm.value;
    this.FirebaseAuth.signInWithEmailAndPassword(Email, Password).then(function(user){
      if ( user ) {
        console.log(user);
      }
    }).catch(function(error) {
      console.log(error);
      Self.ErrorMsg = error.message
    });
  }

  signup(){
    let Self = this;
    let { Email, Password } = this.LoginForm.value;
    this.FirebaseAuth.createUserWithEmailAndPassword(Email, Password).then(function(user){
      if ( user ) {
        console.log(user);
      }
    }).catch(function(error) {
      console.log(error);
      Self.ErrorMsg = error.message
    });
  }
}
