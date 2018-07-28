import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This is title';
  jwt: string;
  get(){
    return this.jwt;
  }
  set(token:string) {
    this.jwt = token;
  }
}
