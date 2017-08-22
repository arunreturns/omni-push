import * as firebase from "firebase";

let config = {
    apiKey: "AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8",
    authDomain: "omnipush-64782.firebaseapp.com",
    databaseURL: "https://omnipush-64782.firebaseio.com",
    projectId: "omnipush-64782",
    storageBucket: "omnipush-64782.appspot.com",
    messagingSenderId: "462635805345"
};
let firebaseInst = firebase.initializeApp(config);

export default firebaseInst