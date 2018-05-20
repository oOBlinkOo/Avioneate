import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import {TarjetaModel} from '../../model/TarjetaModel';
import {UserServiceProvider} from '../../providers/user-service/user-service';
/**
 * Generated class for the TarjetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarjeta',
  templateUrl: 'tarjeta.html',
})
export class TarjetaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
			private userService: UserServiceProvider
  	) {
  	
  	this.basicInfoGlobal = navParams.get('basicInfoGlobal');
  	console.log(this.basicInfoGlobal);
  	this.activarfiltro();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetaPage');
  }
	basicInfoGlobal:basicInfoModel=null;
  activaTarjeta:TarjetaModel=null;
  numerotarjeta=null;
  numerotarjetaORriginal=null;
  validCard=false;
  validCvv=false;
  fechaVigencia='2018-01';
  CVV=null;

test(){
	console.log(this.fechaVigencia);
}

cambiovalor(){
	
	console.log('cambio de valor test',this.numerotarjeta);
	if(this.numerotarjeta.length!=16){
		console.log('show pop up')
		this.validCard=false;
	}else{
		console.log('paso los 16 pop up',this.numerotarjeta.length);
		if(this.numerotarjeta.length==16){
			this.validCard=true;
			this.numerotarjetaORriginal=this.numerotarjeta;
			var formatoTarjeta=this.numerotarjeta.substring(0,4)+'-'+this.numerotarjeta.substring(4,8)
			+'-'+this.numerotarjeta.substring(8,12)+'-'+this.numerotarjeta.substring(12,16);
			console.log(formatoTarjeta);
			this.numerotarjeta=formatoTarjeta;
		}else {
			this.validCard=false;
			// tiene caracteres de mas
		}


	}
}

cambiovalorcvv(){
	console.log('cambio de valor test',this.CVV);
	if(this.CVV.length==3){
		console.log('tiene menos de 3');
		this.validCvv=true;

	}else {
		console.log('no fue valido');
		this.validCvv=false;
	}
}

crearTarjeta(){
	if(this.validCard && this.validCvv && this.fechaVigencia!=null){
		this.sendtoService();
	}else {
		console.log('NOT READY TO SEND !!!!!!!!!!!!!!!!!!');
	}
  
}

sendtoService(){
		  this.userService.createTarjeta(this.basicInfoGlobal.id_user,this.numerotarjeta,this.fechaVigencia,this.CVV).subscribe(
              responseUserService => {
                console.log('response de crear tarjeta',responseUserService);
                if (responseUserService) {
                  // this.loader.dismiss();
                  console.log('tarjeta crear correctamente',responseUserService);
                   this.activarfiltro();
                }
                else {
                	console.log('ERROR en algo');
                  // this.showAlert('The user or the password dont match with any user registered');
                }
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
}

activarfiltro(){
	  this.userService.getTarjeta(this.basicInfoGlobal.id_user).subscribe(
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


}


