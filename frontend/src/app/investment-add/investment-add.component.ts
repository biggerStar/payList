import { Component, OnInit } from '@angular/core';
import { InvestmentMapping, BankMapping, UserMapping } from '../paylist/typeMapping'
import { Finance } from '../investment/finance'
import { InvestmentService } from '../investment/investment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-investment-add',
  templateUrl: './investment-add.component.html',
  styleUrls: ['./investment-add.component.css']
})
export class InvestmentAddComponent implements OnInit {

  modifyTemplate: Finance = new Finance();

  constructor(private investmentService: InvestmentService, private router: Router) { }

  ngOnInit() {
  }

  getUsers() {
    return Array.from(UserMapping.values());
  }

  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'yyyy-MM-dd',
    defaultOpen: true
  }

  getTypes() {
    return Array.from(InvestmentMapping.values());
  }

  getBanks() {
    return Array.from(BankMapping.values());
  }

  onSubmit() {
    this.modifyTemplate.endTime = this._dateTimeFormat(this.modifyTemplate.endTime);
    this.modifyTemplate.startTime = this._dateTimeFormat(this.modifyTemplate.startTime);
    let list = this.modifyTemplate;
    InvestmentMapping.forEach((value: string, key: string) => {
      if (list.type == value) {
        list.type = key;
      }
    })
    BankMapping.forEach((value: string, key: string) => {
      if (list.bank == value) {
        list.bank = key;
      }
    })
    UserMapping.forEach((value: string, key: string) => {
      if (value == list.userName) {
        list.userName = key;
      }
    })
    this.investmentService.addFinance(list).subscribe(response => {
      if (response && response["status"] == "ok") {
          this.router.navigate(["/finance/list"])
      }
    })
  }

  _dateTimeFormat(dateFormat) : string{
    if(!dateFormat) {
      return "无"
    }
    var date = new Date(dateFormat);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDate();
  }
}
