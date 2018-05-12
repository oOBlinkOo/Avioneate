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
import { HomePage } from '../home/home';
import { RegisterAccountPage } from '../register-account/register-account';
import { UserServiceProvider } from '../../providers/user-service/user-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, userService, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.username = null;
        this.password = null;
    }
    // validateLogin(){
    //   this.presentLoading();
    //   this.navCtrl.setRoot(HomePage, {
    //       item: null
    //     });
    // }
    LoginPage.prototype.validateLogin = function () {
        var _this = this;
        this.presentLoading();
        this.userService.login(this.username, this.password).subscribe(function (responseUserService) {
            console.log('paso por aqui en el validate login', responseUserService);
            if (responseUserService) {
                // this.loader.dismiss();
                console.log('paso por aqui en el validate login', responseUserService);
                _this.navCtrl.setRoot(HomePage, {
                    name: responseUserService[0].name,
                    lastname: responseUserService[0].lastname,
                    id_user: responseUserService[0].id_user,
                    member_active: responseUserService[0].member_active,
                    email: responseUserService[0].email,
                    password: responseUserService[0].password
                });
            }
            else {
                _this.showAlert('The user or the password dont match with any user registered');
            }
        }, function (error) {
            console.log(error);
            _this.showAlert('A error calling the system');
        });
    };
    LoginPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            // duration: 3000,
            dismissOnPageChange: true
        });
        this.loader.present();
    };
    LoginPage.prototype.showAlert = function (mesage) {
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
    LoginPage.prototype.createAccount = function () {
        // console.log('no recuerdo que es este item'+item);
        this.navCtrl.push(RegisterAccountPage, {});
    };
    return LoginPage;
}());
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController,
        LoadingController,
        UserServiceProvider,
        AlertController,
        NavParams])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map