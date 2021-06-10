import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http : HttpClient) { }

  getServiceList():Observable<any>{
    const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjYzOGJjNjliLTlhMjgtNGVmNi04YjE5LWNhNGI2ZDQzNTE1ZCIsInN0cmluZyI6Ijc0OEZEQSJ9.lb0BJ9riHRAHM_OC3-1ltKgVhYnwRKPnDL8LwTI-g5M'})
    };
   return this.http.get(baseUrl+'service/b5a493bf-b941-4261-a6d1-8f8f76d1ba7b/list',httpOptions)
 }

}
