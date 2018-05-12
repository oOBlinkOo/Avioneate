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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreateTripPage } from '../pages/create-trip/create-trip';
import { MenuController } from 'ionic-angular';
import { App } from "ionic-angular";
import { LoginPage } from '../pages/login/login';
import { BasicParametersProvider } from '../providers/basic-parameters/basic-parameters';
var MyApp = (function () {
    // private navCtrl: NavController;
    // @ViewChild('mycontent') nav: NavController;
    function MyApp(platform, statusBar, splashScreen, appCtrl, basicParametersProvider, menuCtrl) {
        this.appCtrl = appCtrl;
        this.basicParametersProvider = basicParametersProvider;
        this.menuCtrl = menuCtrl;
        this.rootPage = LoginPage;
        // this.navCtrl = app.getActiveNav();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.subscription = basicParametersProvider.missionAnnounced$.subscribe(function (mission) {
            // this.mission = mission;
            // this.announced = true;
            // this.confirmed = false;
        });
    }
    MyApp.prototype.createTrip = function () {
        this.appCtrl.getRootNav().push(CreateTripPage);
        // this.appCtrl.get
        // console.log("fack nose"+this.navParamsLocal.get('id_user'));
        // console.log("fack nose"+this.navParams.lastname);
        // console.log("fack nose"+this.navParams.id_user);
        this.menuCtrl.close();
        // this.nav.push(CreateTripPage,{
        // });
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen,
        App,
        BasicParametersProvider,
        MenuController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map