import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./components/shared/dashboard/dashboard.component";
import {MakeOrderComponent} from "./components/order/make-order/make-order.component";
import {OrderListComponent} from "./components/order/order-list/order-list.component";
import {OrderBlackboxOpenComponent} from "./components/order/order-blackbox-open/order-blackbox-open.component";
import {FindOrderComponent} from "./components/order/find-order/find-order.component";
import {RegistrationComponent} from "./components/shared/registration/registration.component";
import {LoginComponent} from "./components/shared/login/login.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'order/make', component: MakeOrderComponent},
  {path: 'order/list', component: OrderListComponent},
  {path: 'order/blackBox/open', component: OrderBlackboxOpenComponent},
  {path: 'order/find/trackingCode', component: FindOrderComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
