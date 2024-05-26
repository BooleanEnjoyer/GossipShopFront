import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductImageOverviewComponent } from './product-image-overview/product-image-overview.component';
import { TemplateModule } from '../templates/template.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductBasketComponent } from './product-basket/product-basket.component';
import { UserProductsComponent } from './user-products/user-products.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductImageOverviewComponent,
    ProductAddComponent,
    ProductBasketComponent,
    UserProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    TemplateModule
  ],
  exports: [
    ProductBasketComponent
  ]
})
export class ProductModule { }
