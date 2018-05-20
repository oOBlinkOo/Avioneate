import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { basicInfoModel} from '../../model/basicInfoModel';
import { LoadingController ,AlertController  } from 'ionic-angular';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
basicInfoGlobal:basicInfoModel=null;
basicInfoGlobalc:basicInfoModel=null;
member_active=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public userService:UserServiceProvider) {
    this.basicInfoGlobal = navParams.get('basicInfoGlobal');
    this.basicInfoGlobalc= new basicInfoModel();
    this.basicInfoGlobalc.email=this.basicInfoGlobal.email;
    this.basicInfoGlobalc.id_user=this.basicInfoGlobal.id_user;
    this.basicInfoGlobalc.lastname=this.basicInfoGlobal.lastname;
    this.basicInfoGlobalc.member_active=this.basicInfoGlobal.member_active;
    this.basicInfoGlobalc.name=this.basicInfoGlobal.name;
    this.basicInfoGlobalc.password=this.basicInfoGlobal.password;
    if(parseInt(this.basicInfoGlobalc.member_active.toString())==1){
        this.member_active=true;
  		 
    }else{
      this.member_active=false;
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }



actualizar(){
  console.log('llamada al web service');
   this.userService.updateUser(this.basicInfoGlobalc.id_user, this.basicInfoGlobalc.name,this.basicInfoGlobalc.lastname,this.basicInfoGlobalc.password).subscribe(
              responseUserService => {
                console.log('paso por aqui en el validate login',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('paso por aqui en el validate login',responseUserService);
                  this.basicInfoGlobal.name=this.basicInfoGlobalc.name;
                  this.basicInfoGlobal.lastname=this.basicInfoGlobalc.lastname;
                  this.basicInfoGlobal.password=this.basicInfoGlobalc.password;
                    this.showAlertSuccesfull("Se actualizo tu Perfil");

                }
                else {
                  console.log('algo paso');
                  // this.showAlert('The user or the password dont match with any user registered');
                }
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
}

   showAlertSuccesfull(mesage :string) {
 
    let alert = this.alertCtrl.create({
      title: "" +mesage,
      subTitle: "Done",
      buttons: ['Ok']
    });
    // this.loader.dismiss();
    alert.present();
  }


}
