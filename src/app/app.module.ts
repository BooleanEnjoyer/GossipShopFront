import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {AuthInterceptor} from "./service/user/auth/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OrderModule} from "./components/order/order.module";
import {SharedModule} from "./components/shared/shared.module";
import {HeaderComponent} from "./components/shared/header/header.component";
import {NavigationComponent} from "./components/shared/navigation/navigation.component";
import {DashboardComponent} from "./components/shared/dashboard/dashboard.component";
import { ProductModule } from './components/product/product.module';
import { TemplateModule } from './components/templates/template.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    DashboardComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProductModule,
    OrderModule,
    SharedModule,
    TemplateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        },
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
