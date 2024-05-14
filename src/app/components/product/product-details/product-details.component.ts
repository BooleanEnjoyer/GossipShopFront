import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/product/product';
import { generateMusicProducts } from '../product-list/mock-products';
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit { 

  @Input() currentImagePath ?: string;
  senderProducts = 'sendProducts'
  mockProducts = generateMusicProducts();
  selectedProduct = this.mockProducts[0];
  productSpecificationFields: string[] | undefined;
  currentPage = 0;
  totalPages = 4;
  isDetailsFormOpen = false;
  isAddProductOpen = false;
  startX: number = 0;
  threshold: number = 40;
  
  constructor(private router: Router, private route: ActivatedRoute,
     private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.selectedProduct = this.mockProducts[0];
    this.parseSpecifications(this.selectedProduct.specification);
    this.currentImagePath = this.getCurrentImagePath();
    console.log("Current product: " + this.selectedProduct)
    console.log("Current product img path: " + this.selectedProduct.imagesPath)
    console.log("Current img path: " + this.currentImagePath)
  }

  parseSpecifications(specificationsString: string): void {
    this.productSpecificationFields = specificationsString.split(',').map(spec => spec.trim());
  }

  openForm(formName: string): void {
    if(formName === 'details'){
      this.isDetailsFormOpen = true;
    } else if(formName === 'add-product'){
      this.isAddProductOpen = true;
    }
    document.body.style.overflowY = 'hidden';
  }

  submitForm() {
    console.log("Form submitted, selected product: " + this.selectedProduct.name)
    this.shoppingCartService.addToCart(this.selectedProduct);
    this.isAddProductOpen = false;
    document.body.style.overflowY = 'auto';
  }

  closeForm(formName: string) {
    if(formName === 'details'){
      this.isDetailsFormOpen = false;
    } else if(formName === 'add-product'){
      this.isAddProductOpen = false;
    }
    document.body.style.overflowY = 'auto';
  }
  
  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.currentImagePath = this.getCurrentImagePath();
    console.log("Current img path: " + this.currentImagePath)
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
}
