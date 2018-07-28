import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { LoginService } from './login.service';
import {Login} from './login'
import { Router } from '@angular/router';
import {AppComponent} from '../app.component'
import {TokenService} from '../token.service'
import {SimpleGlobal} from 'ng2-simple-global';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  failFlag: String ;

  constructor(private loginService: LoginService, private router: Router, private token:CookieService) { }

  ngOnInit() {
  }
  onSubmit() {
   this.loginService.login(this.login).subscribe(response => {
     if (response && response["token"]) {
       this.token.put('token',response['token']);
       console.log("login:set token");
       console.log(this.token.get('token'))
       this.router.navigate(["/paylist/list"])
     } 
   }, error => {
     this.failFlag = "password or username is not exist"
   }
  ); 
  }
}
