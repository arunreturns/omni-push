import {Injectable} from '@angular/core';
import * as firebase from "firebase";

const APIKEY="AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8"
const AUTHDOMAIN="omnipush-64782.firebaseapp.com"
const DATABASEURL="https://omnipush-64782.firebaseio.com"
const PROJECTID="omnipush-64782"
const STORAGEBUCKET="omnipush-64782.appspot.com"
const SENDERID="462635805345"

const apiKey = APIKEY;
const authDomain = AUTHDOMAIN;
const databaseURL = DATABASEURL;
const projectId = PROJECTID;
const storageBucket = STORAGEBUCKET;
const messagingSenderId = SENDERID;

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
    constructor() {
        this.firebaseAuth = firebase.auth()
        this.firebaseDatabase = firebase.database()
        this.firebaseMessaging = firebase.messaging()
    }
}