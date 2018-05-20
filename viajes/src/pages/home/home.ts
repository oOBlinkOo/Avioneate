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
  timestartSearch=null;
  timeEndSearch=null;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,    public  basicParametersProvider:BasicParametersProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public tripServiceProvider:TripServiceProvider,
    public appCtrl: App
    ) {
     this.x.id_user=navParams.get('id_user');
     this.x.name=navParams.get('name');
     this.x.lastname=navParams.get('lastname');
     this.x.password=navParams.get('password');
     this.x.member_active=navParams.get('member_active');
     this.x.email= navParams.get('email');
     
     this.basicParametersProvider.confirmMission(this.x);
     this.setHour();
     this.activarfiltro();

       console.log(this.timestartSearch);
  }
   x :basicInfoModel= new basicInfoModel() ;
  groceries=[];
  groceriesv2=[];
  getfullCar=[];

  source='Mérida';
  destino='Tizimín';
  loader :any;
 

  rootpage=RegisterAccountPage;
  numeroplazasBuscar=1;

  activarfiltro(){
      console.log("activar filtro",this.timestartSearch,this.timeEndSearch);
        this.tripServiceProvider.getListFilters(this.source, this.destino,this.givemeFormatDate(this.timestartSearch),this.givemeFormatDate(this.timeEndSearch),this.numeroplazasBuscar).subscribe(
              responseUserService => {
                console.log('paso por aqui en el validate login',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  this.groceries=[];
                  this.groceriesv2=[];
                  this.getfullCar=[];
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

                        this.groceriesv2.push(x);
                        this.testMoreComplext(x);

                      }


                  }else{
                    // es vacio el length
                    this.groceries=[];
                    this.groceriesv2=[];
                    this.getfullCar=[]
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

  testMoreComplext(trip:TripModel){
          this.tripServiceProvider.getFullCar(trip.id_trip).subscribe(
              responseUserService => {
                console.log('getFullCar',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  this.getfullCar.push(responseUserService);
                  console.log('esta volviendo full car',responseUserService);  
                  if(this.getfullCar.length==this.groceriesv2.length){
                    console.log(this.getfullCar);


                      for (var i = 0; i < this.getfullCar.length; ++i) {
                        console.log('valor de i deben ser 3'+i);
                        if(this.getfullCar[i]!=0){
                          console.log('ya entro que paso',this.getfullCar[i]);
                          var assientosOcupados=0;
                          for (var p = 0; p < this.getfullCar[i].length; ++p) {
                            // code...
                            
                            assientosOcupados=assientosOcupados+parseInt(this.getfullCar[i][p].plazaOcupada);
                          }
                          console.log('cuantos asientos llenos',assientosOcupados);
                          if(assientosOcupados+this.numeroplazasBuscar<=this.groceriesv2[i].plaza){
                              this.groceries.push(this.groceriesv2[i]);
                          }
                        }else {
                          console.log('2 no tenian valors');
                          this.groceries.push(this.groceriesv2[i]);
                          for (var i = 0; i < this.groceries.length; ++i) {
                            // code...
                            this.groceries[i]['stars2']=[];
                            var numero=this.getRandomInt(1,5);
                            console.log(this.groceries[i]);
                              for (var p = 0; p <numero; ++p) {
                                   this.groceries[i]['stars2'].push('test');
                              }
                            
                      
                          }
                        }


                            
                          
                      }
                  }                
              
                }
              
              },  (error)=>   {
                console.log(error);
                this.showAlert('A error full car calling the system');
              }
            );
  }

 getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


  givemeFormatDate(newDateconvert:String){
console.log(newDateconvert);
    var newDate= new Date();
    console.log(newDateconvert.toString().length);
        var hora;
        
    var minutes=newDateconvert.substring(0,2);
    if(newDateconvert.toString().length==4){
         hora=newDateconvert.substring(0,1);
        minutes= newDateconvert.substring(2,newDateconvert.length);
    }

    if(newDateconvert.toString().length==5){
         hora=newDateconvert.substring(0,2);
        minutes= newDateconvert.substring(3,newDateconvert.length);
    }


    

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


formatDateCorrect=newDate.getFullYear()+'-'+month+'-'+day+' '+hora+':'+minutes+':'+'00';
// formatDateCorrect=newDate.getFullYear()+'-'+month+'-'+day+' '+hora+':'+minutes+":"+00;
console.log('que estamos enviando',formatDateCorrect);
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
   console.log(newDate.getMinutes());
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


   var hora1;
   if(newDate.getHours().toString().length<2){
        hora1='0'+newDate.getHours();
   }else {
     hora1=newDate.getHours();
   }
   var hora2;
   if(newDate2.getHours().toString().length<2){
        hora2='0'+newDate2.getHours();
   }else {
     hora2=newDate2.getHours();
   }


   this.timestartSearch=hora1+':'+minutes;
   this.timeEndSearch=hora2+':'+minutes2;
   
   
   
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


openDetail(tripdetail:TripModel){

  this.appCtrl.getRootNav().push(DetailTripPage,{
        object:tripdetail,
        basicInfo:this.x,
        numeroplazasBuscar:this.numeroplazasBuscar

        // basicInfo:this.ba

  });

}
  
}
