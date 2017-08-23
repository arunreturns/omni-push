"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var firebase = require("firebase");
var APIKEY = "AIzaSyA_mXCxfn0yyQGTqYkefbx1R49wtgIxTH8";
var AUTHDOMAIN = "omnipush-64782.firebaseapp.com";
var DATABASEURL = "https://omnipush-64782.firebaseio.com";
var PROJECTID = "omnipush-64782";
var STORAGEBUCKET = "omnipush-64782.appspot.com";
var SENDERID = "462635805345";
var apiKey = APIKEY;
var authDomain = AUTHDOMAIN;
var databaseURL = DATABASEURL;
var projectId = PROJECTID;
var storageBucket = STORAGEBUCKET;
var messagingSenderId = SENDERID;
var config = {
    apiKey: apiKey, authDomain: authDomain, databaseURL: databaseURL,
    projectId: projectId, storageBucket: storageBucket,
    messagingSenderId: messagingSenderId
};
firebase.initializeApp(config);
var FirebaseService = (function () {
    function FirebaseService() {
        this.firebaseAuth = firebase.auth();
        this.firebaseDatabase = firebase.database();
        this.firebaseMessaging = firebase.messaging();
    }
    FirebaseService = __decorate([
        core_1.Injectable()
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
