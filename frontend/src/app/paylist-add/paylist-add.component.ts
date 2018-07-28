import { Component, OnInit } from '@angular/core'
import { Paylist } from '../paylist/paylist'
import { TypeMapping, UserMapping } from '../paylist/typeMapping';
import { PaylistService } from '../paylist/paylist.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-paylist-add',
  templateUrl: './paylist-add.component.html',
  styleUrls: ['./paylist-add.component.css']
})
export class PaylistAddComponent implements OnInit {

  list: Paylist = new Paylist();
  types : Map<string, string> = TypeMapping;
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'yyyy-MM-dd',
    defaultOpen: true
} 
  constructor(private paylistService: PaylistService, private router: Router) { }

  ngOnInit() {
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
    this.paylistService.addPaylist(this.list).subscribe(response => {
      if (response && response["status"] == "ok") {
          this.router.navigate(['/paylist/list']);
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
