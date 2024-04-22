import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../entity/order/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() selectedOrder !: Order;
  @Input() findOption !: string;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<Order> = new EventEmitter<Order>();
  senderOrders = 'sendOrders'

  constructor() { }

  isSender(){
    return this.findOption === this.senderOrders;
  }

  ngOnInit(): void {

  }

  closeForm() {
    this.formClosed.emit();
  }
}
