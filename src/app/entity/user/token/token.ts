import {User} from "../user";

export class Token {
  constructor(id : string,
              token : string,
              expired : boolean,
              revoked : boolean,
              issuedAt : Date,
              expirationTime : Date,
              user : User){}
}
