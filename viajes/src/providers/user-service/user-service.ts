// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
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


    login(email, password) {
    var credentials = { email: email, password: password};
    // console.log ('llamando al api HERE ',email,password);
    return this.http.post(this.baseUrl + '/user/login', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

   createAccount(name,lastname,email, password) {
    var credentials = { name: name, 
                        lastname:lastname,
                        email:email,
                        password: password
                      };
    // console.log ('llamando al api HERE ',name,lastname,email,password);
    return this.http.post(this.baseUrl + '/user/createAccount', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

  getUser(user_id) {
    //   console.log('OMGGGGGGGG',user_id);
    // console.log ('llamando al api HERE ');
    return this.http.get(this.baseUrl + '/user/getUser/'+user_id, this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }


      createTarjeta(id_user, numeroTarjeta,vigencia,cvv) {
    var credentials = { id_user: id_user, numeroTarjeta: numeroTarjeta ,vigencia:vigencia ,cvv:cvv};
    // console.log ('llamando al api HERE ');
    return this.http.post(this.baseUrl + '/user/createTarjeta', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

    getTarjeta(user_id) {
    //   console.log('OMGGGGGGGG',user_id);
    // console.log ('llamando al api HERE ');
    return this.http.get(this.baseUrl + '/user/getTarjeta/'+user_id, this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

        updateUser(id_user, name,lastname,password) {
    var credentials = { id_user: id_user,
     name: name ,
     lastname:lastname ,
     password:password
   };
    // console.log ('llamando al api HERE ');
    return this.http.post(this.baseUrl + '/user/updateUser', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }

    getPicks(id_pick) {
      // console.log('OMGGGGGGGG',id_pick);
    // console.log ('llamando al api HERE ');
    return this.http.get(this.baseUrl + '/user/getPicks/'+id_pick, this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }


      reservar(id_trip, id_user,id_pick,plaza,plazaUsuario) {
    var credentials = { id_trip: id_trip, id_user: id_user ,id_pick:id_pick,plaza:plaza,plazaUsuario:plazaUsuario};
    // console.log ('llamando al api HERE ');
    return this.http.post(this.baseUrl + '/user/reservar', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }


}
