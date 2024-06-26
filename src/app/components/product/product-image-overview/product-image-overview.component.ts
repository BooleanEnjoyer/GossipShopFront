import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/entity/product/product';
import { MediaService } from 'src/app/service/media/media.service';


@Component({
  selector: 'app-product-image-overview',
  templateUrl: './product-image-overview.component.html',
  styleUrls: ['./product-image-overview.component.css']
})
export class ProductImageOverviewComponent implements OnInit {

  @Input() currentImagePath ?: string;
  @Input() totalPages !: number;
  @Input() currentPage !: number;
  @Input() selectedProduct !: Product;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  currentIndex: number = 0;
  startX: number = 0;
  threshold: number = 40;

  constructor(public mediaService: MediaService) { }

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
    const imagePath = `assets/images/${this.selectedProduct.productType}/${this.selectedProduct.name}/${this.selectedProduct.imagesNames[this.currentPage]}`;
    return imagePath;
  }

  closeForm() {
    this.formClosed.emit();
  }
}
