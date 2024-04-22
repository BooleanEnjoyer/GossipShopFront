import {Address} from "../address/address";

export class User {
  constructor(public id : string,
              public firstName : string,
              public lastName : string,
              public email : string,
              public phone : number | null,
              public address : Address | null,
              public password : string | null,
              public role : string | null,
              public dateCreated : Date | null,
              public accountNonExpired : boolean | null,
              public accountNonLocked : boolean | null,
              public credentialsNonExpired : boolean| null,
              public enabled : boolean | null){}
}
