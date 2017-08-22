import { Device } from '@ionic-native/device';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebaseInst from '../../utils/firebaseUtil';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  UserMsgs: any[];
  MsgKeys: any[];

  constructor(public navCtrl: NavController, public params: NavParams, public device: Device, private localNotifications: LocalNotifications) {
    console.log("HOMEPAGE", params)
    let UID = params.data.uid
    let Self = this;
    let UserMsgsRef = firebaseInst.database().ref('/' + UID)
    UserMsgsRef.on('value', function (snapshot) {
      let UserMsgs = snapshot.val()
      console.log("[USERMSGS]", UserMsgs)
      Self.UserMsgs = UserMsgs;
      Self.MsgKeys = Object.keys(UserMsgs)
    })
  }

  sendMessage() {
    console.log(this.device.manufacturer)
    console.log(this.device.model)
    console.log(this.device.platform)
  }

  attachFile() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      data: { secret: "AS" }
    });
  }

  deleteMsg(MsgKey) {
    let UID = this.params.data.uid
    firebaseInst.database().ref('/' + UID + '/' + MsgKey).remove(function () {
      console.log('Removed')
    })
  }
}

@Pipe({ name: 'FormattedDate',  pure: false })
export class FormattedDate implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value.slice(0, 24)
    }
}