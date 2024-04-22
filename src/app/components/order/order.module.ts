import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {MakeOrderComponent} from "./make-order/make-order.component";
import {OrderBlackboxOpenComponent} from "./order-blackbox-open/order-blackbox-open.component";
import {FindOrderComponent} from "./find-order/find-order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    MakeOrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderBlackboxOpenComponent,
    FindOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule
  ]
})
export class OrderModule { }
