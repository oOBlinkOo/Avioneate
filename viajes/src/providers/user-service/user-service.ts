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
    console.log ('llamando al api HERE ',email,password);
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
    console.log ('llamando al api HERE ',name,lastname,email,password);
    return this.http.post(this.baseUrl + '/user/createAccount', credentials,this.options).map(responseObject => {
        if(responseObject.status == 200)
          return responseObject.json();
        else
          return false;
    });
  }
}
