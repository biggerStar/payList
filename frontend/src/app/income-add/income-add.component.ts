import { Component, OnInit } from '@angular/core';
import { Incomelist } from '../incomelist/incomelist'
import { IncomeTypeMapping, UserMapping } from '../paylist/typeMapping'
import { IncomelistService } from '../incomelist/incomelist.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-income-add',
  templateUrl: './income-add.component.html',
  styleUrls: ['./income-add.component.css']
})
export class IncomeAddComponent implements OnInit {

  constructor(private incomelistService: IncomelistService, private router: Router) { }

  ngOnInit() {
  }

  list: Incomelist = new Incomelist();
  types : Map<string, string> = IncomeTypeMapping;
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'yyyy-MM-dd',
    defaultOpen: true
} 

  onSubmit() {
    this.types.forEach((value: string,key: string) => {
      if (this.list.type == value) {
        this.list.type = key;
      }
    })
    UserMapping.forEach((value: string, key: string) => {
      if (value == this.list.userName) {
        this.list.userName = key;
      }
    })
    this.incomelistService.addIncomeList(this.list).subscribe(response => {
      if (response && response["status"] == "ok") {
        this.router.navigate(['/income/list'])
      }
    }, error => {
      this.router.navigate(['/login'])
    });
    }

  onDateSelect(event: any) {
    var date = new Date(this.list.time);
    var year = date.getFullYear();
    var month =  (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = (date.getDate()) < 10 ? '0' + date.getDate() : date.getDate();
    var formatTime = year + "-" + month +  "-" + day;
    this.list.time = formatTime; 
  }

  getTypes(){
      return Array.from(this.types.values());
  }

  getUsers() {
    return new Array("冬","宝");
  }
}
