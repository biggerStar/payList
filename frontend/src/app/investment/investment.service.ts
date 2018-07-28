import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Finance } from './finance';
import {HttpHeaderService} from '../http-header.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class InvestmentService {
  private url = 'backend/finance/'; 
  constructor(private http: HttpClient,private httpHeader: HttpHeaderService) { }
    getFinancelists(): Observable<Finance[]> {
      return this.http.get<Finance[]>(this.url + 'list',this.httpHeader.get());
    }

    removeFinanceList(id: string) {
      return this.http.delete(this.url + "delete?_id=" + id, this.httpHeader.get());
    }

    addFinance(list: Finance) : Observable<Finance> {
      return this.http.post<Finance>(this.url + 'submit', list,this.httpHeader.get());
    }

    updateFinance(list: Finance) : Observable<Finance> {
      return this.http.put<Finance>(this.url + 'update', list, this.httpHeader.get());
    }
}
