import { Component, OnInit } from '@angular/core';
import { Paylist } from './paylist';
import { PaylistService } from './paylist.service';
import { PaylistEchartData } from './paylistEchart';
import { PaylistControlModel } from './paylistControlModel'
import { TypeMapping, UserMapping } from './typeMapping';
import { Router } from '@angular/router';
import {Tokens} from '../globalToken'

@Component({
  selector: 'app-paylist',
  templateUrl: './paylist.component.html',
  styleUrls: ['./paylist.component.css']

})

export class PaylistComponent implements OnInit {

  lists: Paylist[];
  displayLists: Paylist[];
  control: PaylistControlModel = new PaylistControlModel();
  options = {};

  ngOnInit() {

  }

  constructor(private paylistService: PaylistService, private router: Router) { 
    this.paylistService.getPaylists().subscribe(lists => {
      this.lists = lists["data"].filter(list => list.time );
      // mapping type from id to charactor
      this.lists.map(x => { x.type = this._getType(x.type); return x; }).map(x => { x.userName = UserMapping.get(x.userName); return x })
      // display the lastest month data
      this.control.time = this.getTime()[0];
      // display data
      this._verifyDispay();
    },error => {
      this.router.navigate(['/login']);
    });
  }
  

  /**
   * format time to "yyyy-MM"
   * sort time desc
   */
  getTime(): string[] {
    var time = new Array();
    if (!this.lists) {
      return ;
    }
    this.lists.filter(list => list.time && list.time.length > 4).forEach(element => {
      var index = element.time.lastIndexOf('-');
      if (!time.includes(element.time.slice(0, index))) {
        time.push(element.time.slice(0, index));
      }
    });
    return time.sort(function (a, b) {
      var v_a = a.split('-')[0] + a.split('-')[1];
      var v_b = b.split('-')[0] + b.split('-')[1];
      if (v_a > v_b) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  selectTime(event: any): void {
    this.control.time = event;
    this._verifyDispay();
  }

  _initOptions(): void {
    this.options = {
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


  _getType(type: string): string {
    var typeMap = TypeMapping;
    return typeMap.get(type);
  }
  /**
   * change the display data according to control data
   */
  _verifyDispay(): void {
    if (!this.displayLists) {
      this.displayLists = this.lists;
    }
    var users = this.control.users;
    var lists = this.lists;
    this.displayLists = lists.filter(list =>
      users.includes(list.userName) && this._matchTime(this.control.time, list.time)
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

  getPaylists(): void {
    this.paylistService.getPaylists()
      .subscribe(lists => this.lists = lists);
  }

  _matchTime(controlTime: string, listTime: string): boolean {
    var shotTime = listTime.slice(0, listTime.lastIndexOf('-'));
    return shotTime == controlTime;
  }


  _getData(): PaylistEchartData {
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
    return new PaylistEchartData(legendData, seriesData, total);
  }
}
