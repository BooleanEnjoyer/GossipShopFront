import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../service/order/order.service";
import {NavigationExtras, Router} from "@angular/router";
import {Order} from "../../../entity/order/order";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css']
})
export class FindOrderComponent implements OnInit {

  formGroup!: FormGroup;
  @Output() responseOrder!: Order;
  @Input() trackingCode: string = '';
  orderFound = false;

  constructor(private orderService: OrderService, private router: Router, private logService: LogService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      trackingCode: new FormControl('', Validators.required)
    });
  }

  orderIsFound(){
    this.orderFound = true
  }

  get orderTrackingCodeControl() {
    return this.formGroup.get('trackingCode');
  }

  submitForm() {
    if (this.formGroup.valid) {
      this.orderService.findOrderByTrackingCode(this.trackingCode).subscribe(
        (response) => {
          alert("Znaleziono zamówienie po kodzie: " + response.trackingCode);
          this.orderIsFound();
          this.responseOrder = response;
        },
        (error) => {
          alert("Błąd przy próbie znalezienia zamówienia. " + error.message);
        }
      );
    } else {
      if(this.logService.isDebugEnabled()){
        console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      }
      alert("Dane znalezienia zamówienia są nieprawidłowe sprawdź poprawność wprowadzonych danych")
    }
  }

  closeDetailsForm() {
    this.router.navigateByUrl('/dashboard');
  }

  closeForm() {
    const navigationToTop: NavigationExtras = {
      queryParams: {},
      fragment: 'top',
    }
    this.router.navigate(['/dashboard'], navigationToTop);
  }

}
