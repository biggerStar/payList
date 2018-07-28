import { UserMapping } from "./typeMapping";

export class PaylistControlModel
 {
    users: Array<string>;
    time: string;
    searchText: string;

    constructor (){
      this.users = Array.from(UserMapping.values());
    }
  }