import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { SessionService } from '../session-service/session.service';
​
@Injectable({
  providedIn: 'root'
})
export class ApiService {
​​
  constructor(private http : HttpClient, private sessionService : SessionService) { }
​
  get(url):Observable<any>{
  let token = this.sessionService.getter('token')
  let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': String(token)})
  };
    return this.http.get(baseUrl+url, httpOptions)
  }
​
  post(url, data):Observable<any>{
  let token = this.sessionService.getter('token')
  let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': String(token)})
  };
    return this.http.post(baseUrl+url, data, httpOptions)
  }
​
  put(url, data):Observable<any>{
  let token = this.sessionService.getter('token')
  let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': String(token)})
  };
    return this.http.put(baseUrl+url, data, httpOptions)
  }

  delete(url):Observable<any>{
    let token = this.sessionService.getter('token')
    let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': String(token)})
    };
      return this.http.delete(baseUrl+url, httpOptions)
  }

  post_form_data(url, data):Observable<any>{
  let token = this.sessionService.getter('token')
  let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': String(token)})
  };
    return this.http.post(baseUrl+url, data, httpOptions)
  }
}