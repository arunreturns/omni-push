"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var notifyjs_1 = require('notifyjs');
var NotificationService = (function () {
    function NotificationService(platform, localNotifications) {
        this.platform = platform;
        this.localNotifications = localNotifications;
    }
    NotificationService.prototype.showNotification = function (notification) {
        console.log("[NotificationService] showNotification", notification);
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.showBrowserNotification(notification);
        }
        else {
            this.showMobileNotification(notification);
        }
    };
    NotificationService.prototype.doNotification = function (title, body) {
        var myNotification = new notifyjs_1["default"](title, {
            body: body,
            notifyShow: onNotifyShow,
            timeout: 5000
        });
        function onNotifyShow() {
            console.log('notification was shown!');
        }
        console.log(myNotification);
        myNotification.show();
    };
    NotificationService.prototype.showBrowserNotification = function (notification) {
        var self = this;
        if (!notifyjs_1["default"].needsPermission) {
            self.doNotification(notification.title, notification.body);
        }
        else if (notifyjs_1["default"].isSupported()) {
            notifyjs_1["default"].requestPermission(function () {
                console.log('Permission has been granted by the user');
                self.doNotification(notification.title, notification.body);
            }, onPermissionDenied);
        }
        function onPermissionDenied() {
            console.warn('Permission has been denied by the user');
        }
    };
    NotificationService.prototype.showMobileNotification = function (notification) {
        this.localNotifications.schedule({
            id: 1,
            title: notification.title,
            text: notification.body
        });
    };
    NotificationService = __decorate([
        core_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
