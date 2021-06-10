import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http : HttpClient) { }

  addRegistration(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.post(baseUrl+'registration/', data ,httpOptions)
  }

  getRegistrationDetails(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.get(baseUrl+'registration/'+id_string, httpOptions)
  }

  getRegistrationStatuses():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.get(baseUrl+'registration/status-list', httpOptions)
  }

  approveRegistration(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.put(baseUrl+'registration/'+id_string+'/approve', {}, httpOptions)
  }

  rejectRegistration(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.put(baseUrl+'registration/'+id_string+'/reject', {}, httpOptions)
  }

  holdRegistration(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.put(baseUrl+'registration/'+id_string+'/hold', {}, httpOptions)
  }

  getRegistrationNotes(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.get(baseUrl+'registration/'+id_string+'/notes', httpOptions)
  }

  addRegistrationNote(id_string, data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.post(baseUrl+'registration/'+id_string+'/note',data, httpOptions)
  }

  getRegistrationPayments(id_string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkX3N0cmluZyI6IjkxZDhjZmE5LWM3ZWUtNGQ1NS04NjE3LWYzNjI2MDg2M2M0OCIsInN0cmluZyI6IjQ1QkZFRiJ9.mNjcisDU9XE-r6KQkkvgF5-hZmh3Vgt4ExNW8K8f0g4'})
    };
    return this.http.get(baseUrl+'registration/'+id_string+'/payments',httpOptions)
  }
}
