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
  currentIndex: number = 0;
  startX: number = 0;
  threshold: number = 40;

  constructor() { }

  ngOnInit(): void {
  }

  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    const currentX = event.touches[0].clientX;
    const diff = currentX - this.startX;
    console.log("Swipe")
    if (diff > this.threshold && !this.isFirstItem()) {
      this.changePage(this.currentPage-1)
      console.log("Current img swipe path: " + this.currentImagePath)
    }
    else if (diff < -this.threshold && !this.isLastItem()) {
      this.changePage(this.currentPage+1);
      console.log("Current img swipe path: " + this.currentImagePath)
    }
  }

  onTouchEnd(): void {
    this.startX = 0;
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.currentImagePath = this.getCurrentImagePath();
    console.log("Current img path: " + this.currentImagePath)
  }

  isLastItem(){
    const test = this.currentPage === this.totalPages - 1;
    console.log("LAST ITEM TEST: " + test)
    return test;
  }

  isFirstItem(){
    const test = this.currentPage === 0;
    console.log("FIRST ITEM TEST: " + test)
    return test;
  }

  getCurrentImagePath(){
    return this.selectedProduct.imagesPath + this.selectedProduct.imagesNames[this.currentPage];
  }

  closeForm() {
    this.formClosed.emit();
  }
}
