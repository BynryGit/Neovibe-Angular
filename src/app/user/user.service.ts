import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { SessionService } from '../common-services/session-service/session.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:any=[];
  utility_id_string = this.sessionService.getter("utility_id_string_admin");
  tenant_id_string;
  constructor(private http : HttpClient,private sessionService:SessionService) {
    
   }  

  getUserListData():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/list', httpOptions)
  }

  getCity(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+utility_id_string+'/city/list', httpOptions)
  }

  getArea(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+utility_id_string+'/area/list', httpOptions)
  }
  getSkills(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+utility_id_string+'/skill/list', httpOptions)
  }

  getUtilityListByTenantIdString():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.tenant_id_string = this.sessionService.getter("tenant_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'tenant/'+this.tenant_id_string+'/utility/list', httpOptions)
  }
  getUserUtilityList():Observable<any>{
    this.token = this.sessionService.getter("token")
    this.tenant_id_string = this.sessionService.getter("tenant_id_string")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/tenant/'+this.tenant_id_string+'/utility/list', httpOptions)
  }
  getRoleListByTypeSubType(type_id_string,subType_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role/type/'+type_id_string+'/sub-type/'+subType_id_string, httpOptions)
  }

  getModuleSubModuleByRole(role_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role/'+role_id_string+'/privileges/', httpOptions)
  }

  getVendorListByUtility():Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'supplier/'+this.utility_id_string+'/list', httpOptions)
  }

  addUser(data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'user/',data,httpOptions)
  }
  addRole(user_id_string,data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'user/'+user_id_string+'/role/',data,httpOptions)
  }

  addUtility(user_id_string,data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'user/'+user_id_string+'/utility/',data,httpOptions)
  }

  getUserDetails(user_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+user_id_string,httpOptions)
  }

  getUserRolePrilvilages(user_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+user_id_string+'/role/',httpOptions)
  }

  getUserUtilitys(user_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+user_id_string+'/utility/',httpOptions)
  }
 
  getUserSkills(user_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+user_id_string+'/skill/',httpOptions)
  }
  getAllSkillsByUtility(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+utility_id_string+'/skill/list',httpOptions)
  }

  addUserSkills(user_id_string,data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'user/'+user_id_string+'/skill/',data,httpOptions)
  }

  getAllAreaByUtility(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+utility_id_string+'/area/list',httpOptions)
  }

  addUserArea(user_id_string,data):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'user/'+user_id_string+'/area/',data,httpOptions)
  }

  getUserArea(user_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'user/'+user_id_string+'/area/',httpOptions)
  }

}
