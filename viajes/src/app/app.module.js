var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
// import {Login } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { RegisterAccountPageModule } from '../pages/register-account/register-account.module';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CreateTripPageModule } from '../pages/create-trip/create-trip.module';
import { BasicParametersProvider } from '../providers/basic-parameters/basic-parameters';
// import { HttpClientModule } from '@angular/common/http'; 
// import { TestProvider } from '../providers/test/test';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            LoginPageModule,
            HomePageModule,
            RegisterAccountPageModule,
            CreateTripPageModule,
            HttpModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            UserServiceProvider,
            BasicParametersProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map