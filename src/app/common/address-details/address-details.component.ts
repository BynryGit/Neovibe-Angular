import { Component, OnInit, Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Feature, WorkOrderService } from 'src/app/work-order/work-order.service';
import { ApiService } from '../../common-services/api-service/api.service';
@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  @Input() data;
  @Input() consumerId;
  @Input() registrationId;
  @Input() userId;
  consumer : any
  address = [];
  urlString;
  consumer_address : string 
  faMapMarkerAlt = faMapMarkerAlt;
  map: mapboxgl.Map;
  cords
  style = 'mapbox://styles/mapbox/streets-v11';
  coordinates: any;
  constructor(private http : HttpClient, private apiService : ApiService) { }
  
  fly_to() {
    this.map.flyTo({
      center: this.cords,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
  }
 

  ngOnInit(): void {
    this.address = this.data
    if(this.consumerId){
      this.urlString="consumer/"+this.consumerId
    }
    else if(this.registrationId){
      this.urlString="registration/"+this.registrationId
    }
    else if(this.userId){
      this.urlString="user/"+this.userId
    }

    if(this.userId){
      // Api call for consumer start
    this.apiService.get(this.urlString).subscribe(data=>{
      this.consumer = data['result']
      
      console.log("============IIISHxsib=====",this.consumer)
      // fetch lat long of the consumer address 
      this.consumer_address =  this.consumer.billing_zipcode + ' ' +  this.consumer.billing_address_line_1 + ' '+this.consumer.billing_state.name +' '+this.consumer.billing_city.name
      console.log("address",this.consumer_address)
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' ;
      this.http.get(url + this.consumer_address + '.json?access_token='+ environment.mapbox.accessToken).subscribe(
        (features: Feature[]) => {
          mapboxgl.accessToken = environment.mapbox.accessToken;
          this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 9,
            center: [features['features'][0].center[0], features['features'][0].center[1]]
        });    
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.addControl(new mapboxgl.FullscreenControl());
        // add marker 
        var marker = new mapboxgl.Marker({color: "#FF0000"})
        .setLngLat([features['features'][0].center[0], features['features'][0].center[1]])
        .addTo(this.map);
        this.cords = [features['features'][0].center[0], features['features'][0].center[1]]
        }
      )
    })
    }
    else{
      // Api call for consumer start
    this.apiService.get(this.urlString).subscribe(data=>{
      this.consumer = data['result']
      console.log("============con=====",this.consumer)
      // fetch lat long of the consumer address 
      this.consumer_address =  this.consumer.billing_zipcode + ' ' +  this.consumer.billing_address_line_1 + ' '+this.consumer.billing_state.name +' '+this.consumer.billing_city.name
      console.log("address",this.consumer_address)
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' ;
      this.http.get(url + this.consumer_address + '.json?access_token='+ environment.mapbox.accessToken).subscribe(
        (features: Feature[]) => {
          mapboxgl.accessToken = environment.mapbox.accessToken;
          this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 9,
            center: [features['features'][0].center[0], features['features'][0].center[1]]
        });    
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.addControl(new mapboxgl.FullscreenControl());
        // add marker 
        var marker = new mapboxgl.Marker({color: "#FF0000"})
        .setLngLat([features['features'][0].center[0], features['features'][0].center[1]])
        .addTo(this.map);
        this.cords = [features['features'][0].center[0], features['features'][0].center[1]]
        }
      )
    })
    }
    

  }  
  
}
