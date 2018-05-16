import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripModel } from '../../model/TripModel';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { LoadingController ,AlertController  } from 'ionic-angular';
/**
 * Generated class for the DetailTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-trip',
  templateUrl: 'detail-trip.html',
})
export class DetailTripPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
		private userService: UserServiceProvider,
		public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  	) {
  	 this.object = navParams.get('object');
  	 console.log(this.object);

  	  this.userService.getUser(this.object.id_user).subscribe(
              responseUserService => {
                console.log('paso por aqui en el get user',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('paso por aqui en el get user',responseUserService);
                  
                }
                else {
                  this.showAlert('something happen');
                }
              },  (error)=>   {
                console.log(error);
                this.showAlert('A error calling the system');
              }
            );
  }
  object:TripModel;
  loader :any;
  gender=null;

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTripPage');
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
