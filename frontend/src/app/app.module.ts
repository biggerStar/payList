import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';


import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { PaylistComponent } from './paylist/paylist.component';
import { PaylistAddComponent } from './paylist-add/paylist-add.component';
import { IncomelistComponent } from './incomelist/incomelist.component';
import {OverviewComponent} from './overview/overview.component'
import {InvestmentComponent} from './investment/investment.component'
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { IncomeAddComponent } from './income-add/income-add.component';
import {HeaderComponent} from './hearder/header.component';
import { InvestmentAddComponent } from './investment-add/investment-add.component';
import { LoginComponent } from './login/login.component';
import { SimpleGlobal } from 'ng2-simple-global';
import { TokenService } from './token.service';
import { CookieModule } from 'ngx-cookie';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule,
    NguiDatetimePickerModule,
    AngularDateTimePickerModule,
    CookieModule.forRoot()


  ],
  declarations: [
    PaylistComponent,
    AppComponent,
    HeaderComponent,
    PaylistAddComponent,
    OverviewComponent,
    InvestmentComponent,
    IncomelistComponent,
    IncomeAddComponent,
    InvestmentAddComponent,
    LoginComponent
    
  ],
  bootstrap: [ AppComponent ],
  providers: [TokenService ]

})
export class AppModule { }
