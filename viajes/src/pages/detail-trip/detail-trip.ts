import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripModel } from '../../model/TripModel';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { LoadingController ,AlertController  } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import {TarjetaModel} from '../../model/TarjetaModel';
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
     this.trip = navParams.get('object');
  	 this.numeroplazasBuscar = navParams.get('numeroplazasBuscar');
     this.formatHora(this.trip.hora);
     this.basicInfoUser = navParams.get('basicInfo');
     this.getUser();
     this.getPicks();
     this.getTarjeta();

  }
  trip:TripModel;
  numeroplazasBuscar:String;
  basicInfoUser:basicInfoModel;
  basicInfoChoffer:basicInfoModel=new basicInfoModel();
  // loader :any;
  gender=null;
  triphoraformat='';
  listPicks=[];
  pickupSelected:any;
  activaTarjeta:TarjetaModel=null;


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTripPage');
  }
  getTarjeta(){
        this.userService.getTarjeta(this.basicInfoUser.id_user).subscribe(
              responseUserService => {
                console.log('give tarjeta',responseUserService);
                if (responseUserService.length!=0) {
                  // this.loader.dismiss();
                  console.log('give tarjeta',responseUserService);
                  var x= new TarjetaModel ();
                  x.id_tarjeta=responseUserService[0].id_tarjeta;
                  x.id_user=responseUserService[0].id_user;
                  x.number_tarjeta=responseUserService[0].number_tarjeta;
                  x.date_vigencia=responseUserService[0].date_vigencia;
                  x.cvv=responseUserService[0].cvv;
                  
                   this.activaTarjeta=x;
                   console.log('llego al activar Tarjeta',this.activaTarjeta);
                }else {
                  this.activaTarjeta=null;
                }
                
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
}

  

  getUser(){
    console.log('entro al get user');
          this.userService.getUser(this.trip.id_user).subscribe(
              responseUserService => {
                console.log('paso por aqui en el get user',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('paso por aqui en el get user',responseUserService);
                  if(responseUserService[0]!=null){
                    this.basicInfoChoffer.id_user=responseUserService[0].id_user;
                    this.basicInfoChoffer.name=responseUserService[0].name;
                    this.basicInfoChoffer.lastname=responseUserService[0].lastname;
                    this.basicInfoChoffer.member_active=responseUserService[0].member_active;
                    this.basicInfoChoffer.email=responseUserService[0].email;
                    this.basicInfoChoffer.password=responseUserService[0].password;
                  }
                  
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

  getPicks(){
         this.userService.getPicks(this.trip.id_trip).subscribe(
              responseUserService => {
                console.log('paso por aqui en el get user',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
               
                  this.listPicks=responseUserService;

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
  formatHora(hora1: string){
    var hora = new Date(hora1);
      var horaTemp= new Date(Date.UTC(hora.getFullYear(),hora.getMonth(),hora.getDate(),hora.getHours(),hora.getMinutes(),hora.getSeconds()));
      this.triphoraformat=horaTemp.toISOString();    
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
      tittle = 'Succesfull!';
      subTitle = mesage;
      buttons = 'OK';
  }
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: [buttons]
    });
    // this.loader.dismiss();
    alert.present();
  }


reservar(){
  console.log(this.trip.id_trip,this.basicInfoUser.id_user,this.pickupSelected);
  console.log(this.trip);

           this.userService.reservar(this.trip.id_trip,this.basicInfoUser.id_user,this.pickupSelected,this.trip.plaza,this.numeroplazasBuscar).subscribe(
              responseUserService => {
                console.log('paso por el reservar',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('paso por el reservar',responseUserService.code);
                  if(responseUserService.code=='409' ){
                    console.log('entro');
                    this.showAlert(responseUserService.message);
                  }else{
                    this.showAlert("Se a registrado Correctamente ");
                  }
                  
                  
                }
                
              },  (error)=>   {
                console.log(error);
                this.showAlert('A error calling the system');
              }
            );

}




}


