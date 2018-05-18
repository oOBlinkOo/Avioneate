import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripModel } from '../../model/TripModel';
import {CreateTripPage} from '../create-trip/create-trip';
import {RegisterAccountPage} from '../register-account/register-account';
import {BasicParametersProvider} from '../../providers/basic-parameters/basic-parameters';
import {basicInfoModel} from '../../model/basicInfoModel';
import { LoadingController ,AlertController  } from 'ionic-angular';
import {TripServiceProvider} from '../../providers/trip-service/trip-service';
import { App } from "ionic-angular";
import {DetailTripPage} from '../detail-trip/detail-trip'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,    public  basicParametersProvider:BasicParametersProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public tripServiceProvider:TripServiceProvider,
    public appCtrl: App
    ) {
      this.id_user = navParams.get('id_user');
     this.name = navParams.get('name');
     this.lastname = navParams.get('lastname');
     this.password = navParams.get('password');
     this.member_active = navParams.get('member_active');
     this.email = navParams.get('email');
     // basicInfoModel x = new basicInfoModel() ;
     var x :basicInfoModel= new basicInfoModel() ;
     x.id_user=this.id_user;
     x.name=this.name;
     x.lastname=this.lastname;
     x.password=this.password;
     x.member_active=this.member_active;
     x.email=this.email;
     
     this.basicParametersProvider.confirmMission(x);
     this.setHour();
     this.activarfiltro();

       console.log(this.timestartSearch);
  }
  groceries=[];
  timestartSearch=null;
  timeEndSearch=null;
  source='Mérida';
  destino='Tizimín';
  loader :any;

  rootpage=RegisterAccountPage;
  id_user=null;
  name=null;
  lastname=null;
  password=null;
  member_active=null;
  email=null;
  numeroplazasBuscar=1;

  activarfiltro(){
      // console.log("activar filtro",this.source,this.destino,this.givemeFormatDate(this.timestartSearch),this.givemeFormatDate(this.timeEndSearch),this.numeroplazasBuscar);
        this.tripServiceProvider.getListFilters(this.source, this.destino,this.givemeFormatDate(this.timestartSearch),this.givemeFormatDate(this.timeEndSearch),this.numeroplazasBuscar).subscribe(
              responseUserService => {
                // console.log('paso por aqui en el validate login',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  this.groceries=[];
                  // console.log('paso por aqui en el validate login',responseUserService);
                  if(responseUserService.length!=0){
                      for (var i = 0; i < responseUserService.length; ++i) {
                        var x = new TripModel();
                        x.costo=responseUserService[i].costo;
                        x.costoComision=responseUserService[i].costoComision;
                        x.destino=responseUserService[i].destino;
                        x.destinoPlaceLat=responseUserService[i].destinoPlaceLat;
                        x.destinoPlaceLng=responseUserService[i].destinoPlaceLng;
                        x.hora=responseUserService[i].hora;
                        x.id_trip=responseUserService[i].id_trip;
                        x.id_user=responseUserService[i].id_user;
                        x.plaza=responseUserService[i].plaza;
                        x.source=responseUserService[i].source;
                        x.sourcePlaceLat=responseUserService[i].sourcePlaceLat;
                        x.sourcePlaceLng=responseUserService[i].sourcePlaceLng;
                        x.status=responseUserService[i].status;
                        this.groceries.push(x);
                      }


                  }else{
                    // es vacio el length
                    this.groceries=[];
                  }
                  
                
                }
                else {
                  this.showAlert('The user or the password dont match with any user registered');
                }
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
  }
ionViewDidEnter() {
  console.log(this.timestartSearch);
    // this.activarfiltro();
}

  givemeFormatDate(newDateconvert:String){
// console.log(newDateconvert);
    var newDate= new Date();
    var minutes=newDateconvert.substring(0,2);
    var segundos=newDateconvert.substring(3,newDateconvert.length);

    var formatDateCorrect:string=null;
    var month;
    var day;
    if(newDate.getMonth()<10){
      var test=parseInt(newDate.getMonth().toString());
      month='0'+(test+1);
    }else {
      var test=parseInt(newDate.getMonth().toString());
      month=test+1;
    }

    if(newDate.getDate()<10){
      day='0'+newDate.getDate();
    }else {
      day=newDate.getDate();
    }

formatDateCorrect=newDate.getFullYear()+'-'+month+'-'+day+' '+minutes+':'+segundos+':'+'00';
// console.log('que estamos enviando',formatDateCorrect);
      return formatDateCorrect.toString();
  }


 showAlert(mesage :string) {
  let tittle;
  let subTitle;
  let buttons;
  // console.log('asfsfasf');
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

  ionViewDidLoad() {
    
    this.activarfiltro();
  }

  setHour(){
       var  newDate = new Date();
   var minutes;
   if(newDate.getMinutes()<10){
       minutes='0'+newDate.getMinutes();
   }else {
       minutes=newDate.getMinutes();
   }

   var  newDate2 = new Date (newDate.getTime()) ;
   newDate2.setMinutes(newDate.getMinutes()+20);
   var minutes2;
   if(newDate2.getMinutes()<10){
       minutes2='0'+newDate2.getMinutes();
   }else {
       minutes2=newDate2.getMinutes();
   }


   this.timestartSearch=newDate.getHours()+':'+minutes;
   this.timeEndSearch=newDate2.getHours()+':'+minutes2;
   
   
   
    console.log('timeStarts',this.timestartSearch);
    console.log('end ',this.timeEndSearch);

  }

  dateFunction(){
    this.activarfiltro();
  }

  changeValues(){
  	var temp1=this.source;
  	var temp2=this.destino;

  	this.destino=temp1;
  	this.source=temp2;
    this.activarfiltro();
  }



  addnew(){
    this.numeroplazasBuscar=this.numeroplazasBuscar+1;
    this.activarfiltro();
  }

  restar(){
    if(this.numeroplazasBuscar==1){

    }else {
    this.numeroplazasBuscar=this.numeroplazasBuscar-1;
      this.activarfiltro();
    }
    
  }


openDetail(object:TripModel){

  this.appCtrl.getRootNav().push(DetailTripPage,{
        object:object
  });

}
  
}
