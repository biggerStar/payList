import { Component, OnInit } from '@angular/core';
import { InvestmentService } from './investment.service'
import { Finance } from './finance'
import { PaylistControlModel } from '../paylist/paylistControlModel'
import { BankMapping, InvestmentMapping, UserMapping, TypeMapping } from '../paylist/typeMapping'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  lists: Finance[];
  displayLists: Finance[];
  control: PaylistControlModel = new PaylistControlModel();
  finance_options = {};
  bank_options = {};
  modifyTemplate: Finance = new Finance();
  rollback: Finance;

  constructor(private investmentService: InvestmentService, private router: Router, private location: Location) {
    this.investmentService.getFinancelists().subscribe(lists => {
      this.lists = lists["data"];
      this.lists.map(x => {
        x.type = InvestmentMapping.get(x.type);
        x.bank = BankMapping.get(x.bank);
        x.userName = UserMapping.get(x.userName)
      })
      this._verifyDispay()
    }, error => {
      this.router.navigate(['/login'])
    }
  )
  }
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'yyyy-MM-dd',
    defaultOpen: false
  }
  ngOnInit() {

  }

  getModifyData(id: string) {
    this.modifyTemplate = this.displayLists.filter(x => x._id == id)[0];
    this.rollback = Object.assign({}, this.modifyTemplate);
  }

  cancel(event: any) {
    location.reload();
  }

  onSubmitDelete(id: string) {
    console.log(id);
    this.investmentService.removeFinanceList(id).subscribe(x => {
      if (x && x["status"]) {
        location.reload();
      }
    });
  }

  onSubmitUpdate(form: NgForm) {
    let list = Object.assign({}, this.modifyTemplate);
    let rollback = Object.assign({}, this.modifyTemplate);
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
    this.investmentService.updateFinance(list).subscribe(response => {
      if (response && response["status"] == "ok") {
        location.reload();
      }
    });
    this.modifyTemplate = rollback;
    console.log(rollback)
  }

  getUsers() {
    return new Array("冬", "宝");
  }

  getTypes() {
    return Array.from(InvestmentMapping.values());
  }

  getBanks() {
    return Array.from(BankMapping.values());
  }

  selectUser(event: any): void {
    var name = UserMapping.get(event.currentTarget.innerText.toString().toLowerCase());
    if (this.control.users.includes(name)) {
      var index = this.control.users.indexOf(name, 0);
      this.control.users.splice(index, 1);
    } else {
      this.control.users.push(name);
    }
    this._verifyDispay();
  }

  _verifyDispay(): void {
    if (!this.displayLists) {
      this.displayLists = this.lists;
    }
    var users = this.control.users;
    var lists = this.lists;
    this.displayLists = lists.filter(list =>
      users.includes(list.userName)
    );
    this.bank_options = this._initOptions(BankMapping);
    this.finance_options = this._initOptions(InvestmentMapping);
  }

  _getBankData(mapping): Object {
    var lists = this.displayLists;

    var legendData = new Array
    var seriesData = new Array

    var map = new Map();
    // for (var i = 0; i <list.length ; i++) {
    lists.forEach(function (list) {
      //var obj = list;
      var type = mapping == BankMapping ? list.bank : list.type;
      var key = type;
      var value = list.money;
      if (map.has(key)) {
        value = map.get(key) + value;
        map.set(key, value);
      } else {
        map.set(key, value);
      }
    });
    var total = 0;
    map.forEach(function (v, key, this_map) {
      legendData.push(key);
      seriesData.push({ name: key, value: v });
      total += v;

    });
    return {
      legendData: legendData,
      seriesData: seriesData,
      total: total.toString()
    };
  }

  _initOptions(mapping): Object {
    return {
      title: {
        text: 'Total:RMB ' + this._getBankData(mapping)["total"],
        subtext: '',
        x: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: this._getBankData(mapping)["legendData"],
        x: 'right'
      },
      series: [
        {
          name: '花费',
          type: 'pie',
          radius: '60%',
          center: ['55%', '60%'],
          data: this._getBankData(mapping)["seriesData"],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}