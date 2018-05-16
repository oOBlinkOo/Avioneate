import { Component ,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';
import {basicInfoModel} from '../../model/basicInfoModel';
import { App } from "ionic-angular";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {NextConfigurationPage} from '../next-configuration/next-configuration';
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

  // Merida 20.9619385,-89.60147
  // Tizimin 21.1480604,-88.1580696
  
   @ViewChild('mycontent') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appCtrl: App,
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
    ];

  }
  asientosDisponibles=1;
  showmap=false;
  source='Mérida';
  destino='Tizimín';
  distancia=null;


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
    this.getPosition();
    
  }
////////////////////////////////////////////////////////////
  addAsientos(){
  	this.asientosDisponibles=this.asientosDisponibles+1;
  }
   changeValues(){
    console.log('destino:',this.destino,'source',this.source);
    var temp1=this.source;
    var temp2=this.destino;

    this.destino=temp1;
    this.source=temp2;
    console.log('despues:',this.destino,'source',this.source);
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
    this.myLatLng = {lat: latitude, lng: longitude};
    // this.myLatLng = {lat: 21.1480604, lng: -88.1580696};
    // tizimin 21.1480604,-88.1580696

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

  private validateCity(){

  }

  nextConfiguration(){
      this.appCtrl.getRootNav().push(NextConfigurationPage,{
      basicInfoGlobal:this.basicInfoGlobal,
      distancia:this.distancia,
      asientosDisponibles:this.asientosDisponibles,
      destino:this.destino,
      source:this.source,
      sourcePlace:this.myLatLng,
      destinoPlace:this.waypoints


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
        console.log(response.routes[0].legs[0].start_address);
        console.log(response.routes[0].legs[0].end_address);
        this.distancia=response.routes[0].legs[0].distance;
              if((response.routes[0].legs[0].start_address.includes('Mérida') && response.routes[0].legs[0].end_address.includes('Tizimín'))
                ||(response.routes[0].legs[0].start_address.includes('Tizimín') && response.routes[0].legs[0].end_address.includes('Mérida')))
              {
                console.log('termino en el mejor de los casos');
                this.directionsDisplay.setDirections(response);
              }else {
                console.log('problemaS!!!!!!!!!!!!!!!!!!!!!!!!');
                this.changeValues();
                this.waypoints = [
                  {
                    location: { lat: 20.9670517, lng: -89.6232899},
                    stopover: true,
                  }
                ];
                this.calculateRoute();
              }

        

        
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  

  }
 

}
