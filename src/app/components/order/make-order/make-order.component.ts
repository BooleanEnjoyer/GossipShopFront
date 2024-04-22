import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../entity/address/address';
import { Order } from '../../../entity/order/order';
import { OrderService } from '../../../service/order/order.service';
import {User} from "../../../entity/user/user";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  @Input() order : Order = {
    id : '',
    trackingCode : '',
    openCode : '',
    totalPrice : 10,
    status : null,
    startingAddress : new Address(null,'','','','',''),
    targetAddress : new Address(null,'','','','',''),
    dateCreated : null,
    lastUpdated : null,
    sender : new User('','','','',null,null,
      null,null,null,null,null,null,null),
    recipient : new User('','','','',null,null,
      null,null,null,null,null,null,null),
  };

  itemsPerPage = 10;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  selectedSortOption = 'none';
  selectedSortOrder = 'asc';

  @Output() formSubmitted: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  formGroup!: FormGroup;

  constructor(private orderService: OrderService,
              private router: Router, private logService: LogService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnInit() {
    this.formGroup = new FormGroup({

      targetCity: new FormControl('', Validators.required),
      targetStreet: new FormControl('', Validators.required),
      targetHouseNumber: new FormControl('', Validators.required),
      targetZipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]),

      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),

      recipientFirstName: new FormControl('', Validators.required),
      recipientLastName: new FormControl('', Validators.required),
      recipientEmail: new FormControl('', Validators.required),
      recipientPhoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')])
    });
  }

  cityControl(city : string) {return this.formGroup.get(city);}
  streetControl(street : string) {return this.formGroup.get(street);}
  houseNumberControl(houseNumber : string) {return this.formGroup.get(houseNumber);}
  zipCodeControl(zipConde : string) {return this.formGroup.get(zipConde);}

  firstNameControl(firstName : string) {return this.formGroup.get(firstName);}
  lastNameControl(lastName : string) {return this.formGroup.get(lastName);}
  emailControl(email : string) {return this.formGroup.get(email);}
  phoneNumberCodeControl(phoneNumber : string) {return this.formGroup.get(phoneNumber);}

  submitForm() {
    if (this.formGroup.valid){
      if(this.logService.isDebugEnabled()){
        console.log("ORDER TARGET ADDRESS " + this.order.targetAddress.street + this.order.targetAddress.city
          + this.order.targetAddress.houseNumber + this.order.targetAddress.zipCode)
      }
      const confirmed = confirm('Napewno chcesz stworzyć takie zamówienie?');
      if(confirmed) {
        this.orderService.addOrder(this.order).subscribe(
          (response) => {
            if(this.logService.isDebugEnabled()){
              console.log(`Zamówienie złożone pomyślnie ${response}`);
            }
            this.formSubmitted.emit(this.order);
          },
          (error) => {
            console.error('Błąd przy odczycie zamówienia', error);
          },
          () => {
            alert('Pomyślnie stworzono zamówienie!')
            this.formGroup.reset();
            // this.getFreeBlackBoxes();
          }
        );
      }
    } else {
      if(this.logService.isDebugEnabled()){
        console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      }
      alert("Zamówienie jest nieprawidłowo wypełnione sprawdź poprawność wprowadzonych danych")
    }
  }

  closeForm() {
    this.formClosed.emit();
    this.formGroup.reset();
    this.router.navigateByUrl('/dashboard');
  }

  // changeBackgroundColor(blackBox : BlackBox){
  //   return this.selectedBlackBox === blackBox;
  // }
  //
  // search() {
  //   this.getFreeBlackBoxes();
  // }
  //
  // private processResponseData(response: any) {
  //   this.blackBoxes = response.content.map(
  //     (blackBoxData: any) => new BlackBox(
  //       blackBoxData.id,
  //       blackBoxData.status,
  //       blackBoxData.size,
  //       blackBoxData.lockStatus,
  //       blackBoxData.telemetrySample,
  //       blackBoxData.currentPickupAddress)
  //   );
  //   this.totalPages = response.totalPages;
  //   this.displayedBlackBoxes = this.blackBoxes;
  // }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    // this.search();
  }
}
