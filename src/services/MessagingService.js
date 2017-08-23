"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MessagingService = (function () {
    function MessagingService(firebaseService) {
        this.firebaseService = firebaseService;
        this.messaging = firebaseService.firebaseMessaging;
        console.log("[MessagingService] Going to Request Permission");
        var self = this;
        this.messaging.requestPermission()
            .then(function () {
            console.log('Notification permission granted.');
            self.messaging.getToken()
                .then(function (currentToken) {
                if (currentToken) {
                    console.log("Current Token is", currentToken);
                }
                else {
                    console.log('No Instance ID token available. Request permission to generate one.');
                }
            })
                .catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);
            });
        })
            .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
        this.messaging.onTokenRefresh(function () {
            self.messaging.getToken()
                .then(function (refreshedToken) {
                console.log('Token refreshed.', refreshedToken);
            })
                .catch(function (err) {
                console.log('Unable to retrieve refreshed token ', err);
            });
        });
    }
    MessagingService.prototype.startOnMsg = function () {
        console.log("Initialize Message", this.messaging);
        this.messaging.onMessage(function (payload) {
            console.log("Message received. ", payload);
        });
    };
    MessagingService = __decorate([
        core_1.Injectable()
    ], MessagingService);
    return MessagingService;
}());
exports.MessagingService = MessagingService;
