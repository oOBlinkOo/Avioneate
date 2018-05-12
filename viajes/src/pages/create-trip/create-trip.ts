import { Component ,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
/**
 * Generated class for the CreateTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google;

@IonicPage()
@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html',
})
export class CreateTripPage {
basicInfoGlobal:basicInfoModel=null;

    map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];

  
  
   @ViewChild('mycontent') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation) {
  	this.basicInfoGlobal = navParams.get('basicInfoGlobal');
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
    this.waypoints = [
      {
        location: { lat: 21.1480604, lng: -88.1580696},
        stopover: true,
      }
      // ,
      // {
      //   location: { lat: 20.9619385, lng: -89.62987240000001 },
      //   stopover: true,
      // },
      // {
      //   location: { lat: 20.9619385, lng: -89.62987240000001 },
      //   stopover: true,
      // },
      // {
      //   location: { lat: 20.9619385, lng: -89.62987240000001 },
      //   stopover: true,
      // }
    ];

  }
  asientosDisponibles=1;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
    this.getPosition();
    
  }
////////////////////////////////////////////////////////////
  addAsientos(){
  	this.asientosDisponibles=this.asientosDisponibles+1;
  }

  restaAsientos(){
  	if(this.asientosDisponibles==1){
  		console.log(alert);
  	}else {
  	this.asientosDisponibles=this.asientosDisponibles-1;	
  	}
	
  }

  ////////////////////////////////////////////////////////////
 getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');

    // create LatLng object
    // this.myLatLng = {lat: latitude, lng: longitude};
    this.myLatLng = {lat: 20.9619385, lng: -89.60147};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute(){
    
    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {
      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });

    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        console.log(response.routes[0].legs[0].distance);
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  

  }
 

}
