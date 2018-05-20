import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController ,AlertController  } from 'ionic-angular';
import {HomePage} from '../home/home';
import {RegisterAccountPage} from '../register-account/register-account';
import {UserServiceProvider} from '../../providers/user-service/user-service';


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
  	
    private userService: UserServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  	public navParams: NavParams) {
  }
  loader :any;
  username : string = null;
  password : string= null;

// validateLogin(){
//   this.presentLoading();
//   this.navCtrl.setRoot(HomePage, {
//       item: null
//     });
         

// }

validateLogin(){
  this.presentLoading();
         this.userService.login(this.username, this.password).subscribe(
              responseUserService => {
                // console.log('paso por aqui en el validate login',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  // console.log('paso por aqui en el validate login',responseUserService);
                   this.navCtrl.setRoot(HomePage, {
                      name: responseUserService[0].name,
                      lastname: responseUserService[0].lastname,
                      id_user: responseUserService[0].id_user,
                      member_active:responseUserService[0].member_active,
                      email:responseUserService[0].email,
                      password:responseUserService[0].password
                    });
                }
                else {
                  this.showAlert('The user or the password dont match with any user registered');
                }
              },  (error)=>   {
                console.log(error);
                this.showAlert('A error calling the system');
              }
            );

}

presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 3000,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  showAlert(mesage :string) {
  let tittle;
  let subTitle;
  let buttons;
  console.log('asfsfasf');
  if (mesage == null) {
      tittle = 'Error!';
      subTitle = 'Try in a while!';
      buttons = 'OK';

  }else {
      tittle = 'Error!';
      subTitle = mesage;
      buttons = 'OK';
  }
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: [buttons]
    });
    this.loader.dismiss();
    alert.present();
  }

  createAccount() {
  	// console.log('no recuerdo que es este item'+item);
    this.navCtrl.push( RegisterAccountPage, {
      // item: item
    });
}




}
