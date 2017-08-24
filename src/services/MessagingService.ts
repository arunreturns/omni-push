import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

import { FirebaseService } from './FirebaseService'
import { NotificationService } from './NotificationService';

@Injectable()
export class MessagingService {
  messaging: any;
  Ref: any;
  Token: any;
  Mode: any;
  constructor(public firebaseService: FirebaseService, public notificationService: NotificationService,
              public device: Device){
    this.messaging = firebaseService.firebaseMessaging;

    this.messaging.requestPermission()
      .then(this.getToken.bind(this, 'New'))
      .catch(this.handleTokenError);
      
    this.messaging.onTokenRefresh(this.getToken.bind(this, 'Refresh'));

    this.messaging.onMessage(function(payload){
      console.log("Message Received", payload);
      notificationService.showNotification(payload.notification)
    })
    let User = firebaseService.firebaseAuth.currentUser;
    this.Ref = '/' + User.uid + '/Devices/'
  }

  getToken(Mode) {
    console.log("[getToken] Mode", Mode)
    this.Mode = Mode;
    this.messaging.getToken()
      .then(this.handleToken.bind(this))
      .catch(this.handleTokenError);
  }
  saveToken(token){
    console.log("Saving Token for Mode: " + this.Mode);
    let { model } = this.device
    let Source = typeof (model) !== 'undefined' && model !== null ? model : 'Browser'
    let FirebaseDB = this.firebaseService.firebaseDatabase;

    FirebaseDB.ref(this.Ref + Source).set(token)
  }
  handleToken(token){
    console.log("Inside handleToken", token)
    if (token) {
      this.Token = token;
      this.saveToken(token)
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }
  
  handleTokenError(err) {
    console.log('Unable to retrieve token ', err);
  }
}