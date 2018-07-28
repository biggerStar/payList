import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {  HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(private cookie: CookieService) { }

  get(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.cookie.get('token')});
    return {
      headers: headers
    };
  }

  set(token:string) {
    this.cookie.put('token', token);
  }
}
