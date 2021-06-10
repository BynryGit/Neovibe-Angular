import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { SessionService } from '../common-services/session-service/session.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Feature, WorkOrderService } from '../work-order/work-order.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() moduleName = new EventEmitter<string>();
  @Output() moduleObj = new EventEmitter<string>();
  @Output() sideNavId = new EventEmitter<string>();
  @Output() utilityList = new EventEmitter<string>();
  @Output() defaultUtility = new EventEmitter<string>();
  @Output() utilityIdString = new EventEmitter<string>();
  @Output() checkBlankUtility = new EventEmitter<string>();

  public changeTabSource = new Subject<any>(); // it use for component communication(pass the data without relation of component)
  public subModuleList = new Subject<any>();
  public moduleIdString = new Subject<any>();


  private selectedUtilityDisplay = new BehaviorSubject<any>(true);
  currentMessageSource = this.selectedUtilityDisplay.asObservable();

  // currentTabSource = this.changeTabSource.asObservable();

  constructor(private http:HttpClient,private sessionService:SessionService, private workOrderService:WorkOrderService) {
   }

   // Login API
   login(data){
     return this.http.post(baseUrl+'user/login/',data)
   }

   token;
   id_string;
   userDetail;
   user_id_string;
   utility_id_string;
   module_id_string;
   moduleIdstring;
   role_id_string;
   sub_module_id_string;
   user_id;
   setColor;

   getModuleByUserTenant(utility_id_string){
    this.token = this.sessionService.getter("token")
    this.user_id_string = this.sessionService.getter("id_string")
    // this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.user_id_string+'/tenant/'+utility_id_string,httpOptions)
   }

   getModuleByUserUtility(utility_id_string){
    this.token = this.sessionService.getter("token")
    this.user_id_string = this.sessionService.getter("id_string")
    // this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.user_id_string+'/utility/'+utility_id_string,httpOptions)
   }

   getSubModuleByUserUtility(utility_id_string,module_id_string){
    this.token = this.sessionService.getter("token")
    this.user_id_string = this.sessionService.getter("id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.user_id_string+'/utility/'+utility_id_string+'/module/'+module_id_string,httpOptions)
   }

   getSubModuleByUserTenant(tenant_id_string,module_id_string){
    this.token = this.sessionService.getter("token")
    this.user_id_string = this.sessionService.getter("id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.user_id_string+'/tenant/'+tenant_id_string+'/tenant-module/'+module_id_string,httpOptions)
   }
   
   // API for checking Role & Privileges
   checkRolePrivilege(){
   
   //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.id_string = this.sessionService.getter("id_string")

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.id_string+'/role/',httpOptions)
  }

  // API for getting Single User Details
   getUserDetails(){
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.id_string,httpOptions)
   }

    // API for Taking utilities of user
   getUserUtility(){
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+this.id_string+'/utility/',httpOptions)
   }

    // API for list of Module according to utility
   getUtilityModuleList(selected_utility){
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+selected_utility+'/module/list',httpOptions)
   }

    // API for list of Sub Module according to utility
    getUtilitySubModuleList(selected_utility){
      this.token = this.sessionService.getter("token")
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.get(baseUrl+'utility/'+selected_utility+'/submodule/list',httpOptions)
     }

     // API for list of Privileages according to module and sub module
    getPrivileagesList():Observable<any>{
      this.token = this.sessionService.getter("token")
      this.role_id_string = this.sessionService.getter("role_id_string")
      this.moduleIdstring = this.sessionService.getter("module_id_string")
      this.sub_module_id_string = this.sessionService.getter("sub_module_id_string")
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.get(baseUrl+'user/role/'+this.role_id_string+'/module/'+this.moduleIdstring+'/sub-module/'+this.sub_module_id_string,httpOptions)
     }


    // API for logout
    logOut(id_string){
      this.token = this.sessionService.getter("token")
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.post(baseUrl+'user/logout/',{"id_string":id_string},httpOptions)
     }



    // API for sending email for password reset
    sendEmail(model: any){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = { headers: headers };
      return this.http.post(baseUrl + "user/request-reset-email" +'/', model, options);
    }

    // API for reset-password
    resetPassword(model: any){
      return this.http.patch(baseUrl + "user/password-reset-complete/<uidb64>/<token>" +'/', model);
    }

    // API for change-password
    changePassword(model: any){
      // var userDetail = JSON.parse(sessionStorage.getItem("UserDetails"))   
      // this.token = userDetail.token
      this.user_id = this.sessionService.getter("user_id");
      this.token = this.sessionService.getter("token");
      this.user_id_string = this.sessionService.getter("id_string")
      console.log(this.token)
      console.log("SXDSSS",model)
      let headers = new HttpHeaders({
        'Content-Type': 'application/json','Authorization': this.token 
        // changePasswordUrl:this.changePasswordUrl
      });
      let options = { headers: headers };
      return this.http.put(baseUrl + "user/change-password/" +this.user_id_string, model,options);
    }

    passModuleIdStringToNav(module_id_string){
      this.moduleIdString.next(module_id_string)
    }
    // store utility id_string for pass the utility id_string to bento component
    getUtilities(msg?){
      this.changeTabSource.next(msg); // it only hold the data
    } 

    // it hold the utility id_string and pass to side nav
    getSideNavData(msg?){
      this.subModuleList.next(msg)
    }

    
    selectedUtility(msg?){ 
      this.selectedUtilityDisplay.next(msg)
    }

    loggedIn(){
      return this.sessionService.getter('token')
    }

    fileUpload(file: FormData) {
      return this.http.post('http://localhost:8000/api/v1/document/upload', file);
    }


 coordinateList;
  setCoordinatesData(data){
    console.log("inside coordinate",data)
    this.coordinateList = []
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    for (let consumers of data) {
      // console.log("valueee==",consumers.consumer_service_contract_detail_id.consumer_id.billing_address_line_1)
      if(consumers?.consumer_id?.billing_address_line_1){
          console.log("inside if")
          this.http.get(url + consumers.consumer_id.billing_address_line_1 + '.json?access_token='+ environment.mapbox.accessToken).subscribe(
            (features: Feature[]) => {
                this.coordinateList.push({
                  'type': 'Feature',
                  'properties': {
                    'description': {
                      'no': consumers.consumer_id.consumer_no, 'email': consumers.consumer_id.first_name+' '+consumers.consumer_id.last_name , 'state':consumers.state
                    }
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [features['features'][0].center[0], features['features'][0].center[1]]
                  }
                })
              });
          }else if(consumers?.consumer_service_contract_detail_id?.consumer_id.billing_address_line_1){
            console.log("inside else")
            this.http.get(url + consumers.consumer_service_contract_detail_id.consumer_id.billing_address_line_1 + '.json?access_token='+ environment.mapbox.accessToken).subscribe(
            (features: Feature[]) => {
                this.coordinateList.push({
                  'type': 'Feature',
                  'properties': {
                    'description': {
                      'no': consumers.consumer_service_contract_detail_id.consumer_id.consumer_no, 'email': consumers.consumer_service_contract_detail_id.consumer_id.first_name+" "+consumers.consumer_service_contract_detail_id.consumer_id.last_name, 'state':consumers.state
                    }
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [features['features'][0].center[0], features['features'][0].center[1]]
                  }
                })
              });
          }
      
        }
        console.log("ouside coordinate",this.coordinateList)
    return this.coordinateList
   }

   loadMap(coordinateLists){
     console.log("inside loadmap")
    // Map Implimentation  start
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-74.050552, 40.719074], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());

    // var coordinateLists = coordinateList
    map.on('load', function () {
      coordinateLists.forEach(function (marker) {
        console.log("inside markerrrrrr",marker)
      // var img = document.createElement('img');
      
        // img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNI81SYO9NnfCLGePM73PrB4b9yxZe6Ydmcw&usqp=CAU';
        // img.style.width = '50px';
        // img.style.height = '50px';
        if(marker?.properties?.description?.state == "CREATED" || marker?.properties?.description?.state == "ACCEPTED"){
          console.log("inside createdddd")
          new mapboxgl.Marker({color: "#6495ED"})
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText(marker.properties.description.no+" - " + marker.properties.description.email))
            .addTo(map)
            .togglePopup();  
        }else if(marker?.properties?.description?.state == "CONNECTED" || marker?.properties?.description?.state == "ASSIGNED"){
          console.log("inside connecteddd")
          new mapboxgl.Marker({color: "#32CD32"})
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText(marker.properties.description.no+" - " + marker.properties.description.email))
            .addTo(map)
            .togglePopup();
        }else if(marker?.properties?.description?.state == "REJECTED" || marker?.properties?.description?.state == "HOLD" || marker?.properties?.description?.state == "APPROVED" ||marker?.properties?.description?.state == "NOT ASSIGNED"){
          console.log("inside historyyyyy")
          new mapboxgl.Marker({color: "#FF6347"})
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText(marker.properties.description.no+" - " + marker.properties.description.email))
            .addTo(map)
            .togglePopup();
        }
        // new mapboxgl.Marker({color: this.setColor})
        //     .setLngLat(marker.geometry.coordinates)
        //     .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText(marker.properties.description.no+" - " + marker.properties.description.email))
        //     .addTo(map)
        //     .togglePopup();
      });
      map.addSource('places', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': coordinateLists,
        }
      });
      // Add a layer showing the places.
      map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-image': '',
          'icon-allow-overlap': false
        }
      });
    });
    console.log("outside loadmap")
  }
  } 
  