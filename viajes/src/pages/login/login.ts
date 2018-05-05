import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController ,AlertController  } from 'ionic-angular';
import {HomePage} from '../home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
  	public loadingCtrl: LoadingController,
  	public navParams: NavParams) {
  }
  loader :any;

validateLogin(){
  this.presentLoading();
  this.navCtrl.setRoot(HomePage, {
      item: null
    });
         

}

presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 3000,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  // showAlert(mesage :string) {
  // let tittle;
  // let subTitle;
  // let buttons;
  // console.log('asfsfasf');
  // if (mesage == null) {
  //     tittle = 'Error!';
  //     subTitle = 'Try in a while!';
  //     buttons = 'OK';

  // }else {
  //     tittle = 'Error!';
  //     subTitle = mesage;
  //     buttons = 'OK';
  // }
  //   let alert = this.alertCtrl.create({
  //     title: tittle,
  //     subTitle: subTitle,
  //     buttons: [buttons]
  //   });
  //   this.loader.dismiss();
  //   alert.present();
  // }

//   createAccount(event, item) {
//   	console.log('no recuerdo que es este item'+item);
//     this.navCtrl.push( RegisterUserPage, {
//       item: item
//     });
// }

//   forgotAccount(event, item) {
//   	console.log('no recuerdo que es este item'+item);
//     this.navCtrl.push( ForgotpasswordPage, {
//       item: item
//     });


// }



}
