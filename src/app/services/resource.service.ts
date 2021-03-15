import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = environment.apiUrl;

  registerPush(data){
    return this.httpClient.post(`${this.apiUrl}api/push-register`, data);
  }

  unRegisterPush(data){
    return this.httpClient.post(`${this.apiUrl}api/push-unregister`, data);
  }

  loadResource(){
    return this.httpClient.get(`${this.apiUrl}api/resource`);
  }

  saveResource(data){
    return this.httpClient.post(`${this.apiUrl}api/resource`, data);
  }
}
