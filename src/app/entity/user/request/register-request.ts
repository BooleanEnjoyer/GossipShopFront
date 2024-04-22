import {Address} from "../../address/address";

export class RegisterRequest {
  constructor(public firstName : string,
              public lastName : string,
              public email : string,
              public phone : number,
              public address : Address,
              public password : string){}
}
