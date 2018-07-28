import { Injectable } from '@angular/core';
import { Paylist } from '../paylist/paylist';
import { Observable, of } from 'rxjs';
import {PAYLIST} from '../paylist/mock-paylist'
import { INCOMELIST } from '../incomelist/mock-incomelist'
import { Incomelist} from '../incomelist/incomelist'
@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor() { }
  getPayLists(): Observable<Paylist[]> {
    return of(PAYLIST);
    // return this.http.get<Paylist[]>(this.heroesUrl)
    //   .pipe(
    //     tap(heroes => console.log(heroes)),
    //     catchError(this.handleError('getHeroes', []))
    //   );
  }
  getIncomeList(): Observable<Incomelist[]> {
    return of(INCOMELIST);
  }
}
