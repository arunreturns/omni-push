// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js');

const apiKey = "AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8";
const authDomain = "omnipush-64782.firebaseapp.com"
const databaseURL = "https://omnipush-64782.firebaseio.com";
const projectId = "omnipush-64782";
const storageBucket = "omnipush-64782.appspot.com";
const messagingSenderId = "462635805345";

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