import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebaseInst from '../../utils/firebaseUtil'

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

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
    let Self = this;
    firebaseInst.auth().onAuthStateChanged(function (user) {
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
    firebaseInst.auth().signInWithEmailAndPassword(Email, Password).then(function(user){
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
    firebaseInst.auth().createUserWithEmailAndPassword(Email, Password).then(function(user){
      if ( user ) {
        console.log(user);
      }
    }).catch(function(error) {
      console.log(error);
      Self.ErrorMsg = error.message
    });
  }
}
