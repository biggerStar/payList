import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = 'backend/login/';  // URL to web api
  constructor(private http: HttpClient) { }
  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.url, login, httpOptions);
  }


}
