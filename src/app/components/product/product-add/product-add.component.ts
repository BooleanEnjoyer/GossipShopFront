import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/entity/product/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @Input() currentImagePath ?: string;
  @Input() totalPages !: number;
  @Input() currentPage !: number;
  @Input() selectedProduct !: Product;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  currentIndex: number = 0;
  threshold: number = 40;
  submitImagePath = 'assets/finance_shopping-cart-grocery-store-b-s.svg';

  constructor() { }

  ngOnInit(): void {
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.currentImagePath = this.getCurrentImagePath();
    console.log("Current img path: " + this.currentImagePath)
  }

  getCurrentImagePath(){
    return this.selectedProduct.imagesPath + this.selectedProduct.imagesNames[this.currentPage];
  }

  addProductToBasket() {

  }

  closeForm() {
    this.formClosed.emit();
  }

  submitForm() {
    this.formSubmitted.emit();
  }
}
