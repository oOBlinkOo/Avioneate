import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import {TripModel} from '../../model/TripModel';
import {TripServiceProvider} from '../../providers/trip-service/trip-service';

/**
 * Generated class for the MytripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mytrips',
  templateUrl: 'mytrips.html',
})
export class MytripsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public tripServiceProvider:TripServiceProvider,) {
  	this.basicInfoGlobal = navParams.get('basicInfoGlobal');
  	this.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MytripsPage');
  }
  groceries=[]
  basicInfoGlobal:basicInfoModel=null;
 

  getList(){
  	  this.tripServiceProvider.getListbyUser(this.basicInfoGlobal.id_user).subscribe(
              responseUserService => {
                console.log('info',responseUserService);
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
                        x.hora=this.formatHora(responseUserService[i].hora);
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
                    
                  }
                  
                
                }
                
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
  }

  formatHora(hora1: string){
    var hora = new Date(hora1);
      var horaTemp= new Date(Date.UTC(hora.getFullYear(),hora.getMonth(),hora.getDate(),hora.getHours(),hora.getMinutes(),hora.getSeconds()));
      // this.triphoraformat=horaTemp.toISOString();    
      console.log(hora1);
      return horaTemp.toISOString();
  }


  validateDate(fecha:string){
console.log('veamos',fecha);
return 	'2019-03-03';
  }

  cerrarTrip(id_trip:string){
    console.log('cerrando trip',id_trip);


        this.tripServiceProvider.closeTrip(id_trip).subscribe(
              responseUserService => {
                console.log('info',responseUserService);
                if (responseUserService) {
                      this.getList();
                  
                
                }
                
              },  (error)=>   {
                console.log(error);
                // this.showAlert('A error calling the system');
              }
            );
  }

}
