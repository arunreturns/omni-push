import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseService } from './../../services/FirebaseService';
import { MessagingService } from './../../services/MessagingService';

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
  Ref: any;
  constructor(public navCtrl: NavController, public params: NavParams, 
              public device: Device,
              public firebaseService: FirebaseService,
              public messagingService: MessagingService) {
    this.FirebaseDB = firebaseService.firebaseDatabase;
    this.UID = params.data.uid
    this.Ref = '/' + this.UID + '/Messages/'
    let UserMsgsRef = this.FirebaseDB.ref(this.Ref)
    UserMsgsRef.on('value', this.handleMsgs.bind(this))
  }

  handleMsgs(Snapshot) {
    let UserMsgs = Snapshot.val()
    console.log("[USERMSGS]", UserMsgs)
    this.UserMsgs = UserMsgs;
    this.MsgKeys = UserMsgs && typeof UserMsgs !== 'undefined' ? Object.keys(UserMsgs) : []
  }

  sendMessage() {
    let { model } = this.device
    let MessageData = {
      Message: this.UserMsg,
      When: (new Date()).toString(),
      Source: typeof (model) !== 'undefined' ? model : 'Browser'
    }
    console.log(MessageData)
    this.FirebaseDB.ref(this.Ref).push(MessageData)
    // this.firebaseService.sendPushMessage(MessageData)
  }

  attachFile() {
  }

  deleteMsg(MsgKey) {
    this.FirebaseDB.ref(this.Ref + MsgKey).remove(function () {
      console.log('Removed')
    })
  }
}