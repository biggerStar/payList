import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   jwt: string;

  set(jwt: string) {
     this.jwt = jwt;
 }

 get() {
     return this.jwt;
 }
  constructor() { }
}
