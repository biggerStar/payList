export class IncomeControlModel
 {
    users: Array<string>;
    time: string;
    searchText: string;

    constructor (){
      this.users = new Array<string>();
      this.users.push("jing");
      this.users.push("dong");
    }
  }