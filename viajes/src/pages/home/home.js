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
import { TripModel } from '../../model/TripModel';
import { RegisterAccountPage } from '../register-account/register-account';
import { BasicParametersProvider } from '../../providers/basic-parameters/basic-parameters';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, basicParametersProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basicParametersProvider = basicParametersProvider;
        this.timeStarts = null;
        this.timeEndSearch = null;
        this.source = "Merida";
        this.destino = "Tizimin";
        this.rootpage = RegisterAccountPage;
        this.id_user = null;
        this.name = null;
        this.lastname = null;
        this.id_user = navParams.get('id_user');
        this.name = navParams.get('name');
        this.lastname = navParams.get('lastname');
        console.log('EL VALOR ES:' + this.name);
        console.log('EL VALOR ES:' + this.lastname);
        console.log('EL VALOR ES:' + this.id_user);
        this.
            //                 name: responseUserService[0].name,
            //                 lastname: responseUserService[0].lastname,
            //                 id_user: responseUserService[0].id_user,
            //                 member_active:responseUserService[0].member_active,
            //                 email:responseUserService[0].email,
            //                 password:responseUserService[0].password
            this.groceries = [
            new TripModel('d_user', 'stars', 'source', 'destino', 'sourcePlace', 'destinoPlace', 'plaza', 'foto'),
            new TripModel('d_user1', 'stars1', 'source1', 'destino1', 'sourcePlace1', 'destinoPlace1', 'plaza1', 'foto1'),
            new TripModel('d_user2', 'stars2', 'source2', 'destino2', 'sourcePlace2', 'destinoPlace2', 'plaza2', 'foto2')
        ];
    }
    HomePage.prototype.test = function () {
        this.basicParametersProvider;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var newDate = new Date();
        var minutes;
        if (newDate.getMinutes() < 10) {
            minutes = '0' + newDate.getMinutes();
        }
        else {
            minutes = newDate.getMinutes();
        }
        this.timeStarts = newDate.getHours() + ':' + minutes;
        var newDate2 = newDate;
        newDate2.setMinutes(newDate.getMinutes() + 20);
        var minutes2;
        if (newDate2.getMinutes() < 10) {
            minutes2 = '0' + newDate2.getMinutes();
        }
        else {
            minutes2 = newDate2.getMinutes();
        }
        this.timeEndSearch = newDate.getHours() + ':' + minutes2;
        console.log('timeStarts', this.timeStarts);
        console.log('end ', this.timeEndSearch);
    };
    HomePage.prototype.changeValues = function () {
        var temp1 = this.source;
        var temp2 = this.destino;
        this.destino = temp1;
        this.source = temp2;
    };
    HomePage.prototype.createTripHome = function () {
        console.log('entro al create trip del home');
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        BasicParametersProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map