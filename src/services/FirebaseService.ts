import {Injectable} from '@angular/core';
import * as firebase from "firebase";

const apiKey = process.env.APIKEY;
const authDomain = process.env.AUTHDOMAIN;
const databaseURL = process.env.DATABASEURL;
const projectId = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messagingSenderId = process.env.SENDERID;

let config = {
    apiKey, authDomain, databaseURL,
    projectId, storageBucket,
    messagingSenderId
};

let firebaseInst = firebase.initializeApp(config);

@Injectable()
export class FirebaseService {
    firebaseAuth : any;
    firebaseDatabase : any;
    constructor() {
        this.firebaseAuth = firebaseInst.auth()
        this.firebaseDatabase = firebaseInst.database()
    }
}