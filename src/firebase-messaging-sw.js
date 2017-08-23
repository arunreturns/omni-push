// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('../node_modules/firebase/firebase-app.js');
importScripts('../node_modules/firebase/firebase-messaging.js');

var APIKEY="AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8"
var AUTHDOMAIN="omnipush-64782.firebaseapp.com"
var DATABASEURL="https://omnipush-64782.firebaseio.com"
var PROJECTID="omnipush-64782"
var STORAGEBUCKET="omnipush-64782.appspot.com"
var SENDERID="462635805345"

var apiKey = APIKEY;
var authDomain = AUTHDOMAIN;
var databaseURL = DATABASEURL;
var projectId = PROJECTID;
var storageBucket = STORAGEBUCKET;
var messagingSenderId = SENDERID;

var config = {
    apiKey, authDomain, databaseURL,
    projectId, storageBucket,
    messagingSenderId
};

firebase.initializeApp(config);
console.log("Initialized App")

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
    click_action: "https://ionicapp-arunreturns.c9users.io/"
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});