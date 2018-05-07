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

import {LoginPageModule}from '../pages/login/login.module'
import {HomePageModule}from '../pages/home/home.module'
import { UserServiceProvider } from '../providers/user-service/user-service';
// import { HttpClientModule } from '@angular/common/http'; 
// import { TestProvider } from '../providers/test/test';

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // LoginPage
    
    
  ],
  imports: [
    BrowserModule,    
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    HomePageModule,
    HttpModule
    // HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // LoginPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
    // TestProvider
  ]
})
export class AppModule {}
