import { Injectable } from '@angular/core';
import {Http ,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
/*
  Generated class for the TripServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TripServiceProvider {

  	http:any;
    baseUrl: String;

   constructor(public https: Http) {
        this.http = https;
          this.baseUrl = 'http://localhost:3000';
        // this.baseUrl = 'https://morning-sierra-10830.herokuapp.com';
        // this.baseUrl = 'https://polar-river-44139.herokuapp.com';
    }
      options = new RequestOptions({
     withCredentials: true
  });

     create(id_user,source,destino,sourcelat,sourcelng,destinolat,destinolng,asientos,fecha,status,precio,precioComision,primerpick,segundopick) {
    var credentials = { id_user: id_user,
    					source:source,
    					destino:destino,
    					sourcelat:sourcelat,
    					sourcelng:sourcelng,
    					destinolat:destinolat,
    					destinolng:destinolng,
    					asientos:asientos,
    					fecha:fecha,
    					status:status,
    					precio:precio,
    					precioComision:precioComision,
    					primerpick:primerpick,
    					segundopick:segundopick
					};

    console.log ('llamando al api HERE ');
    console.log ('llamando al api HERE ',destinolat);
    console.log ('llamando al api HERE ',destinolng);
    return this.http.post(this.baseUrl + '/trip/create', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }



    getListFilters(source, destino,timestart,tiemeend,numeroplazasBuscar) {
      console.log('OMGGGGGGGG',source,destino,timestart,tiemeend,numeroplazasBuscar);
    console.log ('llamando al api HERE ');
    return this.http.get(this.baseUrl + '/trip/getList/'+source+'/'+destino+'/'+timestart+'/'+tiemeend+'/'+numeroplazasBuscar, this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

    getListbyUser(id_user) {
    return this.http.get(this.baseUrl + '/trip/getListbyUser/'+id_user).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

    closeTrip(id_trip) {
    return this.http.get(this.baseUrl + '/trip/closeTrip/'+id_trip).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }


     getFullCar(id_trip) {
      console.log('OMGGGGGGGG');
    console.log ('llamando al api HERE ');
    return this.http.get(this.baseUrl + '/trip/getFullCar/'+id_trip, this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }



}
