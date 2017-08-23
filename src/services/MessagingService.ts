import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

import { FirebaseService } from './FirebaseService'
import { NotificationService } from './NotificationService';

@Injectable()
export class MessagingService {
  messaging: any;
  Ref: any;
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
    console.log("[getToken]")
    this.messaging.getToken()
      .then(this.handleToken.bind(this, Mode))
      .catch(this.handleTokenError);
  }
  saveToken(token, Mode){
    let { model } = this.device
    let Source = typeof (model) !== 'undefined' && model !== null ? model : 'Browser'
    let FirebaseDB = this.firebaseService.firebaseDatabase;

    FirebaseDB.ref(this.Ref + Source).push(token)
  }
  handleToken(token, Mode){
    console.log("Inside handleToken")
    if (token) {
      console.log("Token is", token)
      this.saveToken(token, Mode)
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }
  
  handleTokenError(err) {
    console.log('Unable to retrieve token ', err);
  }
}