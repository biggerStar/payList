import { Component, OnInit } from '@angular/core';
import { Paylist } from '../paylist/paylist'
import { PaylistControlModel } from '../paylist/paylistControlModel'
import { OverviewService } from './overview.service';
import { TypeMapping, UserMapping } from '../paylist/typeMapping'
import { Incomelist } from '../incomelist/incomelist'
import {PaylistService} from '../paylist/paylist.service'
import {IncomelistService } from '../incomelist/incomelist.service'
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  payLists: Paylist[];
  incomeList: Incomelist[];
  displayPayLists: Paylist[];
  displayIncomeList: Incomelist[];
  control: PaylistControlModel = new PaylistControlModel();
  MonthOptions = {};
  AllDataOptions = {};

  constructor(private paylistService: PaylistService, private incomelistService: IncomelistService ,
  private router: Router) {
    this.paylistService.getPaylists()
    .subscribe(pay =>  {
      this.payLists = pay["data"].filter(x => x.time);
      this.incomelistService.getIncomeList()
      .subscribe(income => {
        this.incomeList = income["data"].filter(x => x.time);
        this.displayPayLists = this.payLists.map(x => {x.type = this.getType(x.type); return x;}).map(x => { x.time = x.time.substring(0, x.time.lastIndexOf("-")); return x })
        .map(x=> {x.userName = UserMapping.get(x.userName); return x;})
        this.displayIncomeList = this.incomeList.map(x => {x.type = this.getType(x.type); return x}).map(x => { x.time = x.time.substring(0, x.time.lastIndexOf("-")); return x })
        .map(x=> {x.userName = UserMapping.get(x.userName); return x;})
        this.verifyDispay();
      }, error => {
        this.router.navigate(['/login'])
      });
    },error => {
      
      this.router.navigate(['/login'])
    });
   }


  ngOnInit() {
  }

  getType(type: string): string {
    var typeMap = TypeMapping;
    return typeMap.get(type);
  }

  getTime(list: Object[]) : string[] {
    var time = new Array();
    list.forEach(element => {
      var index = element["time"].lastIndexOf('-');
      if (!time.includes(element["time"].slice(0,index))){
        time.push(element["time"].slice(0,index));
      }
    });
    return time;
  }

  selectUser(event: any): void {
    var name = UserMapping.get(event.currentTarget.innerText.toString().toLowerCase());
    if (this.control.users.includes(name)) {
      var index = this.control.users.indexOf(name, 0);
      this.control.users.splice(index, 1);
    } else {
      this.control.users.push(name);
    }
    console.log(this.control.users);
    this.verifyDispay();
  }

  getPayLists(): void {


  }

  getIncomeList(): void {
    
  }
  verifyDispay(): void {
    if (!this.displayPayLists || !this.displayIncomeList) {
      this.displayPayLists = this.payLists;
      this.displayIncomeList = this.incomeList;
    }
    var users = this.control.users;
    this.displayPayLists = this.payLists.filter(list =>
      users.includes(list.userName)
    );
    this.displayIncomeList = this.incomeList.filter(list =>
      users.includes(list.userName)
    )
    this.initOptions();
  }

  initOptions(): void {
    var data = this.getCountData();
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    this.AllDataOptions = {
      color: colors,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      title: {
        // text: '收入:' + data["income_total"] + '  \n支出:' + data["pay_total"],
        subtext: '总收入: ' + data["income_total"] + '  \n总支出: ' + data["pay_total"],
        x: 'left'
      },
      legend: {
        x: 'center',
        data: ['收入', '支出']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0]
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '收入 '
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: data["mounth"]
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1]
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '支出 '
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: data["mounth"]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '收入',
          type: 'line',
          data: data["income_list"]
        },
        {
          name: '支出',
          type: 'line',
          xAxisIndex: 1,
          data: data["paylist_list"]
        }]
    };

    // Month data
   
    var MonthData = this.getMonthData();
    this.MonthOptions = {
      color: ['#5793f3', '#e5323e'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['收入', '支出']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: MonthData["in_mounth"]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '收入',
          type: 'bar',
          barGap: 0,
          data: MonthData["income_list"]
        },

        {
          name: '支出',
          type: 'bar',
          data: MonthData["pay_list"]
        }
      ]
    }
  }

  getMonthData() :Object{
    var income = Object.create(this.displayIncomeList);
    var paylist = Object.create(this.displayPayLists);
    var out_mounth_list = [];
    var in_mounth_list = [];
    var income_list = [];
    var pay_list = [];

    var income_map = new Map();
    income.forEach(list => {
        var time = list.time
        if (income_map.has(time)) {
            var value = income_map.get(time) + list.money;
            income_map.set(time, value);
        } else {
            income_map.set(time, list.money);
        }
    });
    var pay_map = new Map()
    paylist.forEach(function (list) {
        var time = list.time
        if (pay_map.has(time)) {
            var value = pay_map.get(time) + list.money;
            pay_map.set(time, value);
        } else {
            pay_map.set(time, list.money);
        }
    });

    var income_total = Array.from(income_map.values()).reduce((x, y) => x + y, 0);
    var pay_total = Array.from(pay_map.values()).reduce((x, y) => x + y , 0)
    in_mounth_list = Array.from(income_map.keys()).sort()
    out_mounth_list = Array.from(pay_map.keys()).sort()

    var set = new Set()
    in_mounth_list.forEach(x => { set.add(x) });
    out_mounth_list.forEach(x => { set.add(x) });
    in_mounth_list = Array.from(set).sort();
    out_mounth_list = in_mounth_list;


    in_mounth_list.forEach(x => {
        if (income_map.has(x)) {
            income_list.push(income_map.get(x));
        } else {
            income_list.push(0)
        }
    });

    out_mounth_list.forEach(x => {
        if (pay_map.has(x)) {
            pay_list.push(pay_map.get(x));
        } else {
            pay_list.push(0);
        }
    });

    return {
        in_mounth: in_mounth_list,
        out_mounth: out_mounth_list,
        pay_list: pay_list,
        income_list: income_list,
        income_total: income_total.toString(),
        pay_total: pay_total.toString()
    };
}

  getCountData(): Object {
    
    var income = this.displayIncomeList
    var paylist = this.displayPayLists
    var out_mounth_list = [];
    var in_mounth_list = [];
    var income_list = [];
    var pay_list = [];
    var income_map = new Map();
    income.forEach(list => {
      var time = list.time
      if (income_map.has(time)) {
        var value = income_map.get(time) + list.money;
        income_map.set(time, value);
      } else {
        income_map.set(time, list.money);
      }
    });
    var pay_map = new Map()
    paylist.forEach(function (list) {
      var time = list.time
      if (pay_map.has(time)) {
        var value = pay_map.get(time) + list.money;
        pay_map.set(time, value);
      } else {
        pay_map.set(time, list.money);
      }
    });

    var income_total = Array.from(income_map.values()).reduce((x, y) => x + y ,0);
    var pay_total = Array.from(pay_map.values()).reduce((x, y) => x + y, 0 )
    in_mounth_list = Array.from(income_map.keys()).sort()
    out_mounth_list = Array.from(pay_map.keys()).sort()
    var set = new Set()
    in_mounth_list.forEach(x => { set.add(x) });
    out_mounth_list.forEach(x => { set.add(x) });
    in_mounth_list = Array.from(set).sort();
    out_mounth_list = in_mounth_list;

    function get_in_count(x) {
      if (x == 0) {
        return income_map.has(in_mounth_list[0]) ? income_map.get(in_mounth_list[0]) : 0;
      } else {
        var tmp = income_map.has(in_mounth_list[x]) ? income_map.get(in_mounth_list[x]) : 0;
        return get_in_count(x - 1) + tmp;
      }
    }

    function get_out_count(x) {
      if (x == 0) {
        return pay_map.has(in_mounth_list[0]) ? pay_map.get(in_mounth_list[0]) : 0;
      } else {
        var tmp = pay_map.has(in_mounth_list[x]) ? pay_map.get(in_mounth_list[x]) : 0
        return get_out_count(x - 1) + tmp
      }
    }

    for (var i = 0; i < in_mounth_list.length; i++) {
      income_list.push(get_in_count(i));
      pay_list.push(get_out_count(i));
    }

    return {
      income_list: income_list,
      paylist_list: pay_list,
      income_total: income_total,
      pay_total: pay_total,
      mounth: in_mounth_list
    }
  };

}
