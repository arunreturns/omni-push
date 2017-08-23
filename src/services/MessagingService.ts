import { Injectable } from '@angular/core';
import { FirebaseService } from './FirebaseService'

@Injectable()
export class MessagingService {
  messaging: any;

  constructor(public firebaseService: FirebaseService){
    this.messaging = firebaseService.firebaseMessaging;
    console.log("[MessagingService] Going to Request Permission")
    let self = this;
    
    this.messaging.requestPermission()
      .then(function() {
        console.log('Notification permission granted.');
        self.messaging.getToken()
        .then(function(currentToken) {
          if (currentToken) {
            console.log("Current Token is", currentToken)
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
        });
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
      
    this.messaging.onTokenRefresh(function() {
      self.messaging.getToken()
      .then(function(refreshedToken) {
        console.log('Token refreshed.', refreshedToken);
      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });

  }
  startOnMsg (){
    console.log("Initialize Message", this.messaging)
    this.messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
    });
  }
}