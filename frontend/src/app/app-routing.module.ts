import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaylistComponent } from './paylist/paylist.component';
import { PaylistAddComponent } from './paylist-add/paylist-add.component'
import { IncomelistComponent } from './incomelist/incomelist.component'
import {OverviewComponent} from './overview/overview.component'
import {InvestmentComponent} from './investment/investment.component'
import {InvestmentAddComponent} from './investment-add/investment-add.component'
import {IncomeAddComponent} from './income-add/income-add.component'
import {LoginComponent} from './login/login.component'
import { SimpleGlobal } from 'ng2-simple-global';

const routes: Routes = [
  { path: '', redirectTo: 'paylist/list', pathMatch: 'full' },
  { path: 'paylist/list', component: PaylistComponent },
  { path: 'paylist/add', component: PaylistAddComponent },
  { path: 'income/list', component: IncomelistComponent },
  { path: 'income/add', component: IncomeAddComponent},
  { path: 'finance/list', component: InvestmentComponent},
  { path: 'finance/reload', component: InvestmentComponent},
  { path: 'finance/add', component: InvestmentAddComponent},
  { path: 'balance/list', component: OverviewComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [SimpleGlobal]

})
export class AppRoutingModule {}
