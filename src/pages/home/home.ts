import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseService } from './../../services/FirebaseService';
import { MessagingService } from './../../services/MessagingService';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  UserMsgs: any[];
  MsgKeys: any[];
  Devices: any[];
  DeviceKeys: any[];
  UID: any;
  FirebaseDB: any;
  Message: any;
  DeviceToken: any;
  Ref: any;
  
  MessageForm : FormGroup;
  constructor(public navCtrl: NavController, private params: NavParams, 
              public device: Device, private formBuilder: FormBuilder,
              public firebaseService: FirebaseService,
              public messagingService: MessagingService) {
    this.MessageForm = this.formBuilder.group({
      Message: ['', Validators.required],
      DeviceToken: ['', Validators.required]
    });
    this.FirebaseDB = firebaseService.firebaseDatabase;
    this.UID = this.params.data.uid
    this.Ref = '/' + this.UID
    let UserMsgsRef = this.FirebaseDB.ref(this.Ref)
    UserMsgsRef.on('value', this.handleMsgs.bind(this))
  }

  getKeys(Obj){
    return Obj !== null && typeof Obj !== 'undefined' ? Object.keys(Obj) : []
  }
  handleMsgs(Snapshot) {
    let SnapshotData = Snapshot.val();
    this.UserMsgs = SnapshotData !== null ? SnapshotData.Messages : {};
    this.Devices = SnapshotData !== null ? SnapshotData.Devices : {};
    console.log("[USERMSGS]", this.UserMsgs);
    console.log("[DEVICES]", this.Devices);
    this.MsgKeys = this.getKeys(this.UserMsgs);
    this.DeviceKeys = this.getKeys(this.Devices);
    console.log("MsgKeys = ", this.MsgKeys);
    console.log("DeviceKeys = ", this.DeviceKeys);
  }

  sendMessage() {
    let { model } = this.device
    let { Message, DeviceToken } = this.MessageForm.value;
    let MessageData = {
      Message,
      DeviceToken,
      When: (new Date()).toString(),
      Source: typeof (model) !== 'undefined' && model !== null ? model : 'Browser'
    }
    console.log(MessageData)
    this.FirebaseDB.ref(this.Ref + '/Messages/').push(MessageData)
    this.firebaseService.sendPushMessage(MessageData)
    
    this.MessageForm.reset();
  }

  attachFile() {
  }

  deleteMsg(MsgKey) {
    this.FirebaseDB.ref(this.Ref + '/Messages/' + MsgKey).remove(function () {
      console.log('Removed')
    })
  }
}