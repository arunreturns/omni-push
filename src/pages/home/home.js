"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HomePage = (function () {
    function HomePage(navCtrl, params, device, firebaseService, notificationService, messagingService) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.device = device;
        this.firebaseService = firebaseService;
        this.notificationService = notificationService;
        this.messagingService = messagingService;
        messagingService.startOnMsg();
        this.FirebaseDB = firebaseService.firebaseDatabase;
        this.UID = params.data.uid;
        var Self = this;
        var UserMsgsRef = this.FirebaseDB.ref('/' + this.UID);
        UserMsgsRef.on('value', function (snapshot) {
            var UserMsgs = snapshot.val();
            console.log("[USERMSGS]", UserMsgs);
            Self.UserMsgs = UserMsgs;
            Self.MsgKeys = Object.keys(UserMsgs);
        });
        UserMsgsRef.on('child_added', function (snapshot) {
            var message = snapshot.val();
            // let userAgent = getUserAgent()
            var currentTime = new Date();
            var messageTime = new Date(message.When);
            var secondsDiff = (currentTime - messageTime) / 1000;
            if (secondsDiff < 10) {
                console.log('New Popup', message);
                var Notification = {
                    title: message.Source,
                    body: message.Message
                };
                Self.notificationService.showNotification(Notification);
            }
        });
    }
    HomePage.prototype.sendMessage = function () {
        console.log(this.device.manufacturer);
        console.log(this.device.model);
        console.log(this.device.platform);
        var Source = "Web";
        var MessageData = {
            Message: this.UserMsg,
            When: (new Date()).toString(),
            Source: Source
        };
        // console.log(MessageData)
        this.FirebaseDB.ref('/' + this.UID).push(MessageData);
    };
    HomePage.prototype.attachFile = function () {
    };
    HomePage.prototype.deleteMsg = function (MsgKey) {
        this.FirebaseDB.ref('/' + this.UID + '/' + MsgKey).remove(function () {
            console.log('Removed');
        });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
