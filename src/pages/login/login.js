"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var tabs_1 = require('../tabs/tabs');
var LoginPage = (function () {
    function LoginPage(navCtrl, formBuilder, firebaseService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.firebaseService = firebaseService;
        this.ErrorMsg = "Error Message";
        this.LoginForm = this.formBuilder.group({
            Email: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required]
        });
        this.FirebaseAuth = firebaseService.firebaseAuth;
        var Self = this;
        this.FirebaseAuth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('[Logged In]', user);
                Self.navCtrl.push(tabs_1.TabsPage, {
                    uid: user.uid
                });
            }
        });
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.login = function () {
        var Self = this;
        var _a = this.LoginForm.value, Email = _a.Email, Password = _a.Password;
        this.FirebaseAuth.signInWithEmailAndPassword(Email, Password).then(function (user) {
            if (user) {
                console.log(user);
            }
        }).catch(function (error) {
            console.log(error);
            Self.ErrorMsg = error.message;
        });
    };
    LoginPage.prototype.signup = function () {
        var Self = this;
        var _a = this.LoginForm.value, Email = _a.Email, Password = _a.Password;
        this.FirebaseAuth.createUserWithEmailAndPassword(Email, Password).then(function (user) {
            if (user) {
                console.log(user);
            }
        }).catch(function (error) {
            console.log(error);
            Self.ErrorMsg = error.message;
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
