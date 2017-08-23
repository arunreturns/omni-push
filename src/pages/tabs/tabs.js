"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var settings_1 = require('../settings/settings');
var profile_1 = require('../profile/profile');
var home_1 = require('../home/home');
var TabsPage = (function () {
    function TabsPage(navParams) {
        this.navParams = navParams;
        this.tab1Root = home_1.HomePage;
        this.tab2Root = settings_1.SettingsPage;
        this.tab3Root = profile_1.ProfilePage;
        this.params = navParams;
        console.log("NavParams UID", this.params);
    }
    TabsPage = __decorate([
        core_1.Component({
            templateUrl: 'tabs.html'
        })
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
