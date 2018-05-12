var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
/**
 * Generated class for the RegisterAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterAccountPage = (function () {
    function RegisterAccountPage(navCtrl, userService, loadingCtrl, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.lastName = null;
        this.email = null;
        this.password = null;
    }
    RegisterAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterAccountPage');
    };
    RegisterAccountPage.prototype.createAccount = function () {
        var _this = this;
        this.presentLoading();
        console.log('Creando cuenta llamando al service');
        this.userService.createAccount(this.name, this.lastName, this.email, this.password).subscribe(function (responseUserService) {
            if (responseUserService) {
                console.log('paso por aqui la respuesta del createAccount', responseUserService);
                _this.navCtrl.pop();
            }
            else {
                _this.showAlert('The user or the password dont match with any user registered');
            }
        }, function (error) {
            console.log(error);
            _this.showAlert('A error calling the system');
        });
    };
    RegisterAccountPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            // duration: 3000,
            dismissOnPageChange: true
        });
        this.loader.present();
    };
    RegisterAccountPage.prototype.showAlert = function (mesage) {
        var tittle;
        var subTitle;
        var buttons;
        console.log('asfsfasf');
        if (mesage == null) {
            tittle = 'Error!';
            subTitle = 'Try in a while!';
            buttons = 'OK';
        }
        else {
            tittle = 'Error!';
            subTitle = mesage;
            buttons = 'OK';
        }
        var alert = this.alertCtrl.create({
            title: tittle,
            subTitle: subTitle,
            buttons: [buttons]
        });
        this.loader.dismiss();
        alert.present();
    };
    return RegisterAccountPage;
}());
RegisterAccountPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-register-account',
        templateUrl: 'register-account.html',
    }),
    __metadata("design:paramtypes", [NavController,
        UserServiceProvider,
        LoadingController,
        AlertController,
        NavParams])
], RegisterAccountPage);
export { RegisterAccountPage };
//# sourceMappingURL=register-account.js.map