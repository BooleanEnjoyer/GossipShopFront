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

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductImageOverviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    TemplateModule
  ]
})
export class ProductModule { }
