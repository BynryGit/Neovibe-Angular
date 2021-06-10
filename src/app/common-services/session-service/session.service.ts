import { Injectable, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private cookieService:CookieService) { }

  data;
  expiredDate; 
  
  //set the value in Session storage
  setter(key,data){
    // sessionStorage.setItem(key,data)
    this.cookieService.set(key,data)
  }

  //get the value from Session storage
  getter(key):Observable<any>{
    // this.data = sessionStorage.getItem(key) 
    this.data = this.cookieService.get(key)  
    return this.data
  }

  // remove value from Session storage
  remove(key){
    // this.data = sessionStorage.removeItem(key) 
    this.data = this.cookieService.deleteAll(key)  
  }

  clear(){
    console.log('clear');
    this.cookieService.deleteAll('/')
  }
  
}
