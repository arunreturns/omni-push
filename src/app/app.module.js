"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var settings_1 = require('../pages/settings/settings');
var profile_1 = require('../pages/profile/profile');
var home_1 = require('../pages/home/home');
var tabs_1 = require('../pages/tabs/tabs');
var login_1 = require('../pages/login/login');
var status_bar_1 = require('@ionic-native/status-bar');
var splash_screen_1 = require('@ionic-native/splash-screen');
var device_1 = require('@ionic-native/device');
var local_notifications_1 = require('@ionic-native/local-notifications');
var FirebaseService_1 = require('./../services/FirebaseService');
var NotificationService_1 = require('./../services/NotificationService');
var MessagingService_1 = require('./../services/MessagingService');
var push_1 = require('@ionic-native/push');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                settings_1.SettingsPage,
                profile_1.ProfilePage,
                home_1.HomePage,
                tabs_1.TabsPage,
                login_1.LoginPage
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                settings_1.SettingsPage,
                profile_1.ProfilePage,
                home_1.HomePage,
                tabs_1.TabsPage,
                login_1.LoginPage
            ],
            providers: [
                status_bar_1.StatusBar,
                splash_screen_1.SplashScreen,
                device_1.Device,
                local_notifications_1.LocalNotifications,
                NotificationService_1.NotificationService,
                FirebaseService_1.FirebaseService,
                MessagingService_1.MessagingService,
                push_1.Push,
                { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
