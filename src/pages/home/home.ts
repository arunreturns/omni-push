import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/FirebaseService';
import { NotificationService } from './../../services/NotificationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  UserMsgs: any[];
  MsgKeys: any[];
  UID: any;
  FirebaseDB: any;
  UserMsg: any;
  constructor(public navCtrl: NavController, public params: NavParams, 
              public device: Device, public firebaseService: FirebaseService,
              public notificationService: NotificationService) {
    this.FirebaseDB = firebaseService.firebaseDatabase;
    this.UID = params.data.uid
    let Self = this;
    let UserMsgsRef = this.FirebaseDB.ref('/' + this.UID)
    UserMsgsRef.on('value', function (snapshot) {
      let UserMsgs = snapshot.val()
      console.log("[USERMSGS]", UserMsgs)
      Self.UserMsgs = UserMsgs;
      Self.MsgKeys = Object.keys(UserMsgs)
    })

    UserMsgsRef.on('child_added', function (snapshot) {
      var message = snapshot.val()
      // let userAgent = getUserAgent()
      let currentTime: any = new Date()
      let messageTime: any = new Date(message.When)
      let secondsDiff = (currentTime - messageTime) / 1000
      if (secondsDiff < 10) {
        console.log('New Popup', message)
        let Notification = {
          title: message.Source,
          body: message.Message
        }
        Self.notificationService.showNotification(Notification)
      }
    })
  }

  sendMessage() {
    console.log(this.device.manufacturer)
    console.log(this.device.model)
    console.log(this.device.platform)
    let Source = "Web"
    let MessageData = {
      Message: this.UserMsg,
      When: (new Date()).toString(),
      Source
    }
    // console.log(MessageData)
    this.FirebaseDB.ref('/' + this.UID).push(MessageData)
  }

  attachFile() {
  }

  deleteMsg(MsgKey) {
    this.FirebaseDB.ref('/' + this.UID + '/' + MsgKey).remove(function () {
      console.log('Removed')
    })
  }
}