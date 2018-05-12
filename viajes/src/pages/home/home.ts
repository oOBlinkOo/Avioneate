import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripModel } from '../../model/TripModel';
import {CreateTripPage} from '../create-trip/create-trip';
import {RegisterAccountPage} from '../register-account/register-account';
import {BasicParametersProvider} from '../../providers/basic-parameters/basic-parameters';
import {basicInfoModel} from '../../model/basicInfoModel';

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
    ,    public  basicParametersProvider:BasicParametersProvider
    ) {
      this.id_user = navParams.get('id_user');
     this.name = navParams.get('name');
     this.lastname = navParams.get('lastname');
     this.password = navParams.get('password');
     this.member_active = navParams.get('member_active');
     this.email = navParams.get('email');
     // basicInfoModel x = new basicInfoModel() ;
     var x :basicInfoModel= new basicInfoModel() ;
     console.log('EL VALOR ES:'+this.name);
     console.log('EL VALOR ES:'+this.lastname);
     console.log('EL VALOR ES:'+this.id_user);
     x.id_user=this.id_user;
     x.name=this.name;
     x.lastname=this.lastname;
     x.password=this.password;
     x.member_active=this.member_active;
     x.email=this.email;
     

     this.basicParametersProvider.confirmMission(x);



  this.groceries=[
  new TripModel('d_user','stars','source','destino','sourcePlace','destinoPlace','plaza','foto') ,
  new TripModel('d_user1','stars1','source1','destino1','sourcePlace1','destinoPlace1','plaza1','foto1') , 
  new TripModel('d_user2','stars2','source2','destino2','sourcePlace2','destinoPlace2','plaza2','foto2')  ];
  }
  groceries:any;
  timeStarts=null;
  timeEndSearch=null;
  source="Merida";
  destino="Tizimin";
  rootpage=RegisterAccountPage;
  id_user=null;
  name=null;
  lastname=null;
  password=null;
  member_active=null;
  email=null;



  ionViewDidLoad() {
   var  newDate = new Date();
   var minutes;
   if(newDate.getMinutes()<10){
   		minutes='0'+newDate.getMinutes();
   }else {
   		minutes=newDate.getMinutes();
   }
   this.timeStarts=newDate.getHours()+':'+minutes;

   var  newDate2 = newDate;
   newDate2.setMinutes(newDate.getMinutes()+20);
   var minutes2;
   if(newDate2.getMinutes()<10){
   		minutes2='0'+newDate2.getMinutes();
   }else {
   		minutes2=newDate2.getMinutes();
   }
   this.timeEndSearch=newDate.getHours()+':'+minutes2;
   
   
    console.log('timeStarts',this.timeStarts);
    console.log('end ',this.timeEndSearch);

    
  }

  changeValues(){
  	var temp1=this.source;
  	var temp2=this.destino;

  	this.destino=temp1;
  	this.source=temp2;
  }

  createTripHome(){

    console.log('entro al create trip del home');
  }

  
}
