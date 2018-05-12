var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserServiceProvider = (function () {
    function UserServiceProvider(https) {
        this.https = https;
        this.options = new RequestOptions({
            withCredentials: true
        });
        this.http = https;
        this.baseUrl = 'http://localhost:3000';
        // this.baseUrl = 'https://morning-sierra-10830.herokuapp.com';
        // this.baseUrl = 'https://polar-river-44139.herokuapp.com';
    }
    UserServiceProvider.prototype.login = function (email, password) {
        var credentials = { email: email, password: password };
        console.log('llamando al api HERE ', email, password);
        return this.http.post(this.baseUrl + '/user/login', credentials, this.options).map(function (responseObject) {
            if (responseObject.status == 200)
                return responseObject.json();
            else
                return false;
        });
    };
    UserServiceProvider.prototype.createAccount = function (name, lastname, email, password) {
        var credentials = { name: name,
            lastname: lastname,
            email: email,
            password: password
        };
        console.log('llamando al api HERE ', name, lastname, email, password);
        return this.http.post(this.baseUrl + '/user/createAccount', credentials, this.options).map(function (responseObject) {
            if (responseObject.status == 200)
                return responseObject.json();
            else
                return false;
        });
    };
    return UserServiceProvider;
}());
UserServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserServiceProvider);
export { UserServiceProvider };
//# sourceMappingURL=user-service.js.map