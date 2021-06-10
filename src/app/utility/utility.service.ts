import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { SessionService } from '../common-services/session-service/session.service';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class UtilityService {

  token;
  
  
  tenant_id_string;
  utility_id_string;
  constructor(private http : HttpClient,private sessionService:SessionService) {} 

 getUtilityListData():Observable<any>{
   //get value of token and utility_id_string from sessionStorage
   this.token = this.sessionService.getter("token")
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
   };
   return this.http.get(baseUrl+'utility/list', httpOptions)
 }

 getUtilityListByTenant():Observable<any>{
  //get value of token and utility_id_string from sessionStorage
  this.token = this.sessionService.getter("token")
  this.tenant_id_string = this.sessionService.getter("tenant_id_string")
  console.log("TENANT",this.tenant_id_string)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
  };
  return this.http.get(baseUrl+'utility/tenant/'+this.tenant_id_string+'/list', httpOptions)
}


 // API for Taking Module list from tenant wise
  getModuleListData(tenant_id_string):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.get(baseUrl+'tenant/'+tenant_id_string+'/module/list',httpOptions)
  }

  // API for Taking Sub Module list from commonapp
  getSubModuleListData(module_id_string):Observable<any>{
    console.log("MODULE ID STRING",module_id_string)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'tenant/module/'+module_id_string+'/submodule/list?tenant_id='+this.sessionService.getter("tenant_id_string"),httpOptions)
  }

// API for Taking countries list from commonapp
  getCountriesListData():Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'country/list',httpOptions)
  }

  // API for Taking regions list from commonapp
  getRegionsListData():Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'region/list',httpOptions)
  }

  // API for Taking Category list from commonapp
  getCategoryListData():Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'category/list',httpOptions)
  }

    // API for Taking product list from commonapp
    getProductListData():Observable<any>{
      this.token = this.sessionService.getter("token")  
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.get(baseUrl+'product/list',httpOptions)
    }

    // API for Taking Tenant list from utility
    getTenantListData():Observable<any>{
      this.token = this.sessionService.getter("token")  
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
      };
      return this.http.get(baseUrl+'tenant/list',httpOptions)
    }


  // API for add utility
  addUtility(data):Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'utility/module', data ,httpOptions)
    }
}
