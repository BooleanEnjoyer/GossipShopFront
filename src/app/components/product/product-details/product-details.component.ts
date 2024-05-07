import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/product/product';
import { generateMusicProducts } from '../product-list/mock-products';

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
  
  constructor(private router: Router, private route: ActivatedRoute) { }

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

  openDetailsForm(): void {
    this.isDetailsFormOpen = true;
    document.body.style.overflowY = 'hidden';
  }

  closeDetailsForm() {
    this.isDetailsFormOpen = false;
    document.body.style.overflowY = 'auto';
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.currentImagePath = this.getCurrentImagePath();
    console.log("Current img path: " + this.currentImagePath)
  }

  getCurrentImagePath(){
    return this.selectedProduct.imagesPath + this.selectedProduct.imagesNames[this.currentPage];
  }
}
