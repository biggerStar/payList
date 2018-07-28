import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  Incomelist} from './incomelist';
import { CookieService } from 'ngx-cookie';
import {HttpHeaderService} from '../http-header.service'

@Injectable({
  providedIn: 'root'
})
export class IncomelistService {
  private url = 'backend/income/';  // URL to web api
  httpOptions = {}
  constructor(private http: HttpClient, private httpHeader: HttpHeaderService) { 
  }
  getIncomeList(): Observable<Incomelist[]> {
    return this.http.get<Incomelist[]>(this.url + 'list', this.httpHeader.get());
  }

  addIncomeList(list: Incomelist) : Observable<Incomelist> {
    return this.http.post<Incomelist>(this.url + 'submit', list, this.httpHeader.get());
  }

}
