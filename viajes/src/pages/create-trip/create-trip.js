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
/**
 * Generated class for the CreateTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateTripPage = (function () {
    function CreateTripPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var id_user = navParams.get('id_user');
        var name = navParams.get('name');
        var lastname = navParams.get('lastname');
        console.log('EL VALOR ES dentro de createtip:' + name);
        console.log('EL VALOR ES createtip:' + lastname);
        console.log('EL VALOR ES createtip:' + id_user);
    }
    CreateTripPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateTripPage');
    };
    return CreateTripPage;
}());
CreateTripPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-create-trip',
        templateUrl: 'create-trip.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], CreateTripPage);
export { CreateTripPage };
//# sourceMappingURL=create-trip.js.map