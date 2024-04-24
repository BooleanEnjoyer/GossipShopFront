import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/entity/product/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit { 

  @Input() selectedProduct !: Product;
  @Input() findOption !: string;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<Product> = new EventEmitter<Product>();
  senderProducts = 'sendProducts'

  constructor() { }

  // isSender(){
  //   return this.findOption === this.senderOrders;
  // }

  ngOnInit(): void {

  }

  closeForm() {
    this.formClosed.emit();
  }
}
