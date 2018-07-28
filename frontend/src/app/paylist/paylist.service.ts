import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Paylist } from './paylist';
import { SimpleGlobal } from 'ng2-simple-global';
import { TokenService } from '../token.service'
import { Token } from '../../../node_modules/@angular/compiler';
import { CookieService } from 'ngx-cookie';
import {HttpHeaderService} from '../http-header.service'
@Injectable({
  providedIn: 'root',
})
export class PaylistService {
  httpOptions = {};
  private url = 'backend/paylist/';  // URL to web api
  constructor(private http: HttpClient, private httpHeader: HttpHeaderService) {
   
  }

  /** GET heroes from the server */
  getPaylists(): Observable<Paylist[]> {
    return this.http.get<Paylist[]>(this.url + 'list', this.httpHeader.get());
  }

  addPaylist(list: Paylist): Observable<Paylist> {
    return this.http.post<Paylist>(this.url + 'submit', list, this.httpHeader.get());
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  }
}
