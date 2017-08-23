import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

const apiKey = "AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8";
const authDomain = "omnipush-64782.firebaseapp.com"
const databaseURL = "https://omnipush-64782.firebaseio.com";
const projectId = "omnipush-64782";
const storageBucket = "omnipush-64782.appspot.com";
const messagingSenderId = "462635805345";

let config = {
    apiKey, authDomain, databaseURL,
    projectId, storageBucket,
    messagingSenderId
};

firebase.initializeApp(config);

@Injectable()
export class FirebaseService {
  firebaseAuth : any;
  firebaseDatabase : any;
  firebaseMessaging : any;
  constructor(public http: Http, public device: Device) {
      this.firebaseAuth = firebase.auth()
      this.firebaseDatabase = firebase.database()
      this.firebaseMessaging = firebase.messaging()
  }

  sendPushMessage(MessageData){
    let headers = new Headers();
    headers.append('Authorization', 'key=AAAAa7c-KqE:APA91bGBAzcaFGEZW1qANDfeE2Hgdc9oBcVDf1-OhyHWPbvuNTNjbjED6lWu0HDPNJLK3hK20g8IbsNotn7fp9S3B6Zkl_fYE8oUKriMNeEsn-GgwJIHVL2BT93DGDsrBSvTFRmw2_Et')
    headers.append('Content-Type','application/json')

    let body = {
      "to": "f5Qo1ACajXM:APA91bGgGnK8fs1AsaiNqoZ9iv0EAyeYCTC0N3G4XtZHJifb1xwovv3Lwv3stKHaRB3SjJlsvf_zobgMPiPe3jfVwdbwt2R43NDplA3ieAWVQjJYGThqyzqrMielAbK0C6x2vgKIAygt",
        "notification": {
        "title": "Hello",
        "body": "world"
      }
    }
    this.http.post('https://fcm.googleapis.com/fcm/send', body, {
        headers
      })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
      });
  }
}