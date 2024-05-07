import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button/back-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloseButtonComponent } from './close-button/close-button.component';



@NgModule({
  declarations: [
    BackButtonComponent,
    CloseButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [
    BackButtonComponent,
    CloseButtonComponent
  ]
})
export class TemplateModule { }
