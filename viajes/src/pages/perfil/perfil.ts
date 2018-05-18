import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { basicInfoModel} from '../../model/basicInfoModel';


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
member_active=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider) {
    this.basicInfoGlobal = navParams.get('basicInfoGlobal');
    if(parseInt(this.basicInfoGlobal.member_active.toString())==1){
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
   this.userService.updateUser(this.basicInfoGlobal.id_user, this.basicInfoGlobal.name,this.basicInfoGlobal.lastname,this.basicInfoGlobal.password).subscribe(
              responseUserService => {
                console.log('paso por aqui en el validate login',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('paso por aqui en el validate login',responseUserService);
                   // this.navCtrl.setRoot(HomePage, {
                   //    name:this.basicInfoGlobalname,
                   //    lastname: responseUserService[0].lastname,
                   //    id_user: responseUserService[0].id_user,
                   //    member_active:responseUserService[0].member_active,
                   //    email:responseUserService[0].email,
                   //    password:responseUserService[0].password
                   //  });
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


}
