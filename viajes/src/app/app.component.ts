import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CreateTripPage} from '../pages/create-trip/create-trip';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ViewChild, ElementRef } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { App } from "ionic-angular";
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {BasicParametersProvider} from '../providers/basic-parameters/basic-parameters';
import { Subscription }   from 'rxjs';
import { basicInfoModel} from '../model/basicInfoModel';
import {TarjetaPage} from '../pages/tarjeta/tarjeta';
import {PerfilPage} from '../pages/perfil/perfil';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  subscription: Subscription;
  basicInfoGlobal:basicInfoModel=null;
   // private navCtrl: NavController;
 // @ViewChild('mycontent') nav: NavController;
 
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,
    public appCtrl: App,
    public  basicParametersProvider:BasicParametersProvider,
    public menuCtrl: MenuController) {
  
      // this.navCtrl = app.getActiveNav();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.subscription = basicParametersProvider.missionAnnounced$.subscribe(
      mission => {
        // this.mission = mission;
        // this.announced = true;
        // this.confirmed = false;
        console.log("mi servicio funcionia bitch please"+mission);
        this.basicInfoGlobal=mission;
    });
  }
createTrip(){

  this.appCtrl.getRootNav().push(CreateTripPage,{
      basicInfoGlobal:this.basicInfoGlobal
  });
    this.menuCtrl.close();

}

openTarjeta(){

  this.appCtrl.getRootNav().push(TarjetaPage,{
      basicInfoGlobal:this.basicInfoGlobal
  });
    this.menuCtrl.close();

}

getPersonalInfo(){
    this.appCtrl.getRootNav().push(PerfilPage,{
      basicInfoGlobal:this.basicInfoGlobal
  });
    this.menuCtrl.close();
}


}


