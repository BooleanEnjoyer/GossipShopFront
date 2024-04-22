import { Address } from "../address/address";
import {OrderStatus} from "./enums/order-status";
import {User} from "../user/user";

export class Order {

  constructor(public id : string,
              public trackingCode : string,
              public openCode : string,
              public totalPrice : number,
              public status : OrderStatus | null,
              public startingAddress : Address,
              public targetAddress : Address,
              public dateCreated : Date | null,
              public lastUpdated : Date | null,
              public sender : User,
              public recipient : User) {}
}
