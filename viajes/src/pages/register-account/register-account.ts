import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController ,AlertController  } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service/user-service';

/**
 * Generated class for the RegisterAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-account',
  templateUrl: 'register-account.html',
})
export class RegisterAccountPage {

  constructor(public navCtrl: NavController,
	private userService: UserServiceProvider,
	public loadingCtrl: LoadingController,
	public alertCtrl: AlertController,
    public navParams: NavParams) {
  }
  name :any;
  lastName : string = null;
  email : string= null;
  password : string= null;
  loader :any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterAccountPage');
  }

  createAccount(){
  	this.presentLoading();
  	console.log('Creando cuenta llamando al service');	
  	        this.userService.createAccount(this.name, this.lastName,this.email,this.password).subscribe(
              responseUserService => {
                if (responseUserService) {
                  console.log('paso por aqui la respuesta del createAccount',responseUserService);
                   this.navCtrl.pop();
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


}
