var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/*
  Generated class for the BasicParametersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BasicParametersProvider = (function () {
    function BasicParametersProvider(http) {
        this.http = http;
        this.missionConfirmedSource = new Subject();
        this.missionAnnounced$ = this.missionConfirmedSource.asObservable();
        console.log('Hello BasicParametersProvider Provider');
    }
    BasicParametersProvider.prototype.confirmMission = function (astronaut) {
        this.missionConfirmedSource.next(astronaut);
    };
    return BasicParametersProvider;
}());
BasicParametersProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], BasicParametersProvider);
export { BasicParametersProvider };
//# sourceMappingURL=basic-parameters.js.map