import {Component, Input, OnInit} from '@angular/core';
import {CompleteOrderRequest} from "../../../entity/order/request/complete-order-request";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../service/order/order.service";
import {Router} from "@angular/router";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-order-blackbox-open',
  templateUrl: './order-blackbox-open.component.html',
  styleUrls: ['./order-blackbox-open.component.css']
})
export class OrderBlackboxOpenComponent implements OnInit {

  formGroup!: FormGroup;
  @Input() openBlackBoxRequest : CompleteOrderRequest = {
    id : '',
    openCode : ''
  }

  constructor(private orderService: OrderService, private router: Router, private logService: LogService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      openCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    });
  }

  get orderIdControl() {return this.formGroup.get('id');}
  get openCodeControl() {return this.formGroup.get('openCode');}

  submitForm() {
    if (this.formGroup.valid){
      const confirmed = confirm('Napewno chcesz otworzyć BlackBoxa?');
      if(confirmed){
        this.orderService.openBlackBox(this.openBlackBoxRequest).subscribe(
          (response) => {
            alert("Otworzono BlackBoxa " + response.message)
          },
          (error) => {
            alert("Wystąpił błąd przy otwieraniu" + error);
            if(this.logService.isDebugEnabled()){
              console.error('Błąd otwieraniu BlackBoxa' + error);
            }
          }
        );
      }
    }else {
      if(this.logService.isDebugEnabled()){
        console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      }
      alert("Dane do otwarcia skrzynki są nieprawidłowe sprawdź poprawność wprowadzonych danych")
    }
  }

  closeForm() {
    this.router.navigateByUrl('/dashboard');
  }
}
