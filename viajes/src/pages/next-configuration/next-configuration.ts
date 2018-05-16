import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import {TripServiceProvider} from '../../providers/trip-service/trip-service';
import { LoadingController ,AlertController  } from 'ionic-angular';
/**
 * Generated class for the NextConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-configuration',
  templateUrl: 'next-configuration.html',
})
export class NextConfigurationPage {
	basicInfoGlobal:basicInfoModel=null;
	price=null;
	distancia=null;
	distanciaNumber=null;
	listrosGasolina=null;
	precioCalculado=null;
  precioCalculadoComision=null;
	asientosDisponibles=null;
   timeStarts=null;
   timeStartsFecha=null;
   primerpickup=null;
   segundopickup=null;
     destino=null;     
      source=null;
     sourcePlace=null
      destinoPlace=null;
      loader :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public tripServiceProvider:TripServiceProvider,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController
    ) {
  	this.basicInfoGlobal = navParams.get('basicInfoGlobal');
  	this.distancia = navParams.get('distancia');
    this.asientosDisponibles = navParams.get('asientosDisponibles');
    this.destino = navParams.get('destino');
  	this.source = navParams.get('source');
    this.sourcePlace = navParams.get('sourcePlace');
    this.destinoPlace = navParams.get('destinoPlace');

  	this.distancia=this.distancia.text;
  	this.distanciaNumber= this.distancia.replace('km','');
  	this.listrosGasolina=this.distanciaNumber/24;
  	this.precioCalculado=this.listrosGasolina*18.05;
    this.precioCalculado=this.precioCalculado.toFixed(2);

  	this.precioCalculadoComision=Number(this.precioCalculado)+5;


  	console.log(this.basicInfoGlobal,this.distancia,this.asientosDisponibles);
    this.fechasthings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextConfigurationPage');


  }
  fechasthings(){

    var  newDate = new Date();
   var minutes;
   if(newDate.getMinutes()<10){
       minutes='0'+newDate.getMinutes();
   }else {
       minutes=newDate.getMinutes();
   }
   this.timeStarts=newDate.getHours()+':'+minutes;
   var month=newDate.getMonth()+1;
   this.timeStartsFecha=newDate.getFullYear().toString()+'-0'+month+'-'+newDate.getDate();
    console.log('timeStarts',this.timeStarts,this.timeStartsFecha);
    
  }

  test(){
    console.log('timeStarts',this.timeStarts,this.timeStartsFecha);
    var newDate=new Date();
    newDate.setDate(this.timeStartsFecha.substring(8,this.timeStartsFecha.lenght));
    newDate.setMonth(this.timeStartsFecha.substring(5,7));
    console.log(this.timeStartsFecha.substring(5,7), newDate.getMonth());

    newDate.setFullYear(this.timeStartsFecha.substring(0,4));     
    newDate.setHours(this.timeStarts.substring(0,2));
    newDate.setMinutes(this.timeStarts.substring(3,this.timeStarts.length));


    console.log('parametros a enviar al webservice', newDate,this.timeStarts.substring(0,2),this.timeStarts.substring(3,this.timeStarts.length));
    console.log(this.basicInfoGlobal.id_user,this.source,this.destino,this.sourcePlace,this.destinoPlace[0].location,
      this.asientosDisponibles,newDate,'OPEN',this.precioCalculado,this.precioCalculadoComision);
    this.presentLoading();

    this.tripServiceProvider.create(
                                      this.basicInfoGlobal.id_user,
                                      this.source,
                                      this.destino,
                                      this.sourcePlace.lat,
                                      this.sourcePlace.lng,
                                      this.destinoPlace[0].location.lat,
                                      this.destinoPlace[0].location.lng,
                                      this.asientosDisponibles,
                                       this.givemeFormatDate(newDate),
                                       // newDate.toDateString,
                                       // newDate.toLocaleString,
                                       // newDate.toTimeString,

                                      'OPEN',
                                      this.precioCalculado,
                                      this.precioCalculadoComision,
                                      this.primerpickup,
                                      this.segundopickup




      ).subscribe(
              responseUserService => {
                console.log('rESPONSE DEL SERVICIO',responseUserService);
                if (responseUserService) {
                  this.loader.dismiss();
                  console.log('rESPONSE DEL SERVICIO',responseUserService);
                  this.showAlertSuccesfull(responseUserService.insertId);
                 
                   this.navCtrl.popToRoot();
                   
                }
                else {
                  this.showAlert('Error del servicio!!!');
                }
              },  (error)=>   {
                console.log(error);
                this.showAlert('A error calling the system');
              }
            );


  }

  givemeFormatDate(newDate:Date){
    console.log('EL DATE ESTA BIEN',newDate);
    var formatDateCorrect:string=null;
    var month;
    var day;
    if(newDate.getMonth()<10){
      month='0'+newDate.getMonth();
    }else {
      month=newDate.getMonth();
    }

    if(newDate.getDate()<10){
      day='0'+newDate.getDate();
    }else {
      day=newDate.getDate();
    }
formatDateCorrect=newDate.getFullYear()+'-'+month+'-'+day+' '+newDate.toLocaleTimeString();
console.log('que estamos enviando',formatDateCorrect);
      return formatDateCorrect.toString();
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
   showAlertSuccesfull(mesage :string) {
 
    let alert = this.alertCtrl.create({
      title: "Trip created Succesfull with id:" +mesage,
      subTitle: "Done",
      buttons: ['Ok']
    });
    // this.loader.dismiss();
    alert.present();
  }

}
