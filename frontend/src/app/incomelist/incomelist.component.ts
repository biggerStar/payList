import { Component, OnInit } from '@angular/core';
import { IncomeEchartData} from './IncomeEchart';

import { IncomeControlModel } from './IncomeControlModel';
import { IncomelistService } from './incomelist.service';
import { Incomelist } from './incomelist';
import { IncomeTypeMapping, UserMapping } from '../paylist/typeMapping';
import { PaylistControlModel } from '../paylist/paylistControlModel';

@Component({
  selector: 'app-incomelist',
  templateUrl: './incomelist.component.html',
  styleUrls: ['./incomelist.component.css']
})
export class IncomelistComponent implements OnInit{

  lists: Incomelist[];
  displayLists: Incomelist[];
  control: PaylistControlModel = new  PaylistControlModel();
  incomeOptions = {};

  ngOnInit() {

  }

  getType(type: string): string{
    var typeMap = IncomeTypeMapping;
    return typeMap.get(type);
  }
  constructor(private incomelistService: IncomelistService) { 
    this.incomelistService.getIncomeList()
    .subscribe(lists => 
      {
        this.lists = lists["data"].filter(x => x.time);
        this.control.time = this.getTime()[0];
        this.lists.map(x => { x.type = this.getType(x.type);return x;}).map(x => {x.userName = UserMapping.get(x.userName);return x});
        this._verifyDispay();
      });
  }

  getTime() : string[] {
    var time = new Array();
    if (!this.lists) {
      return;
    }
    this.lists.forEach(element => {
      var index = element.time.lastIndexOf('-');
      if (!time.includes(element.time.slice(0,index))){
        time.push(element.time.slice(0,index));
      }
    });
    return time.sort(function(a,b) {
      var v_a = a.split('-')[0] + a.split('-')[1];
      var v_b = b.split('-')[0] + b.split('-')[1];
      if (v_a > v_b) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  selectTime(event: any) : void{
    this.control.time = event;
    this._verifyDispay(); 
  }

  _initOptions(): void {
    this.incomeOptions = {
      title: {
        text: 'Total:RMB ' + this._getData().total,
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
        data: this._getData().legendData,
        x: 'right'
      },
      series: [
        {
          name: '花费',
          type: 'pie',
          radius: '60%',
          center: ['55%', '60%'],
          data: this._getData().seriesData,
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

  /**
   * change the display data according to control data
   */
  _verifyDispay(): void {
    if (!this.displayLists) {
      this.displayLists = this.lists;
    }
    this.displayLists = this.lists.filter(list => 
      this.control.users.includes(list.userName) && this._matchTime(this.control.time, list.time)
    ).sort(function (a, b) {
      var v_a = a.time.split(" ")[0].split('-').reduce((a,b) => {return  a+b});

      var v_b = b.time.split(" ")[0].split('-').reduce((a,b) => {return a+b});
      if (v_a > v_b) {
        return -1;
      } else {
        return 1;
      }
    });
    this._initOptions();
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


  _matchTime(controlTime:string, listTime:string) : boolean {
    var shotTime = listTime.slice(0,listTime.lastIndexOf('-'));
    return shotTime == controlTime;
  }

  _getData(): IncomeEchartData{
    var lists = this.displayLists;
    var legendData = new Array; 
    var seriesData = new Array;
    var typeMoneyMap = new Map();
    lists.forEach(function (list) {
      var type = list.type;
      var money = list.money;
      if (typeMoneyMap.has(type)) {
        money = typeMoneyMap.get(type) + money;
        typeMoneyMap.set(type, money);
      } else {
        typeMoneyMap.set(type, money);
      }
    });
    var total = 0;
    typeMoneyMap.forEach(function (v, key, this_map) {
      legendData.push(key);
      seriesData.push({ name: key, value: v });
      total += v;
    });
    return new IncomeEchartData(legendData, seriesData, total);
  }
}
