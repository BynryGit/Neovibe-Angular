import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { SessionService } from '../common-services/session-service/session.service';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { environment } from '../../environments/environment';


export interface MapboxOutPut{
  attribution: String;
  features:Feature[];
  query:[];

}

export interface Feature{
  place_name:String;
  latitude:Number;
  longitued:Number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(private http : HttpClient,private sessionService:SessionService) {} 
  token;
  utility_id_string;


  search_word(query:String){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' ;
    return this.http.get(url + query + '.json?access_token='+ environment.mapbox.accessToken)
    
  }

  getAssetListData():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'asset/list', httpOptions)
  }

  getAreaList():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+this.utility_id_string+'/areas', httpOptions)
  }

  getSubAreaList(area_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'area/'+area_id_string+'/sub-areas', httpOptions)
  }

  getPremisesList(subarea_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'sub-area/'+this.utility_id_string+'/premises?subarea_id='+subarea_id_string, httpOptions)
  }

  getConsumerList():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'consumer/utility/'+this.utility_id_string+'/list', httpOptions)
  }

  getWorkOrderTemplateList():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'work-order/utility/'+this.utility_id_string+'/list', httpOptions)
  }

  getRuleList():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.utility_id_string = this.sessionService.getter("utility_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'work-order/utility/'+this.utility_id_string+'/rules/list', httpOptions)
  }

  addServiceAppointment(data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'work-order/service-appointment',data,httpOptions)
  }
}
