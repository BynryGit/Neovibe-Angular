import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityConfigurationService {
  token;
  utility_id_string;
  tenant_id_string;
  constructor(private http:HttpClient,private sessionService:SessionService) { }

  // API for Taking Role List
  getRoleList():Observable<any>{

    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role/list',httpOptions)
   }

   // API for Taking Role List
  getRoleListByutility():Observable<any>{

    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role/utility/'+this.utility_id_string+'/list',httpOptions)
   }

   // API for Taking Role Type List
  getRoleTypeList():Observable<any>{

    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role-type/'+this.utility_id_string+'/list',httpOptions)
   }

   // API for Taking utility wise Role Type List
  getRoleTypeListByUtility():Observable<any>{

    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+this.utility_id_string+'/role-type/list',httpOptions)
   }

   // API for Taking utility wise Role Type List
  getRoleSubTypeListByUtility():Observable<any>{

    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+this.utility_id_string+'/role-subtype/list',httpOptions)
   }

  // API for Taking Role Sub Type List
  getRoleSubTypeList(id_string):Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role-type/'+id_string+'/role-subtype/list',httpOptions)
   }

   // API for Taking FormFactor List
  getFormFactorList():Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'form-factor/list',httpOptions)
   }

  // API for Taking FormFactor List
  getDepartmentListbyTenant():Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.tenant_id_string = this.sessionService.getter("tenant_id_string")

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+this.tenant_id_string+'/department/list',httpOptions)
   }

   // API for Taking FormFactor List
  getDepartmentListbyUtility(utility_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+utility_id_string+'/departments/list',httpOptions)
   }

   // API for Taking utility module List
  getUtilityModuleList():Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+this.utility_id_string+'/module/list',httpOptions)
   }

   // API for Taking utility sub module List module wise
  getUtilitySubModuleList(module_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/module/'+module_id_string+'/submodule/list',httpOptions)
   }

   // API for Taking utility sub module List module wise
  getUtilityModuleSubModuleList():Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
   this.utility_id_string = this.sessionService.getter("utility_id_string_admin")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'utility/'+this.utility_id_string+'/module-submodule/list?tenant_id='+this.sessionService.getter("tenant_id_string"),httpOptions)
   }

   // API for Taking utility Privileges List module wise
  getPrivilegesList():Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'privilege/list',httpOptions)
   }

    // API for add Role
  addRole(data):Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'role/', data ,httpOptions)
    }

      // API for add RolePrivileges
  addRolePrivileges(role_id_string,data):Observable<any>{
    this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.post(baseUrl+'role/'+role_id_string+'/privileges/', data ,httpOptions)
    }

    // API for Taking Detail info of roles
  getRoleDetails(role_id_string):Observable<any>{
    //get value of token and id string from sessionStorage
   this.token = this.sessionService.getter("token")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': this.token})
    };
    return this.http.get(baseUrl+'role/'+role_id_string,httpOptions)
   }
}


