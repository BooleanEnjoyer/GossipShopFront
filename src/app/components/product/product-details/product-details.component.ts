import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/product/product';
import { generateMusicProducts } from '../product-list/mock-products';
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';
import { MediaService } from 'src/app/service/media/media.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  @Input() currentImagePath ?: string;
  selectedProduct !: Product;
  productSpecificationFields: string[] | undefined;
  currentPage = 0;
  totalPages = 4;
  isDetailsFormOpen = false;
  isAddProductOpen = false;
  startX: number = 0;
  threshold: number = 40;

  constructor(private router: Router, private route: ActivatedRoute,
     private shoppingCartService: ShoppingCartService, public mediaService: MediaService) {
    // const navigation = this.router.getCurrentNavigation()?.extras?.state['product'];
  }

  ngOnInit(): void {
    const product = history.state.product;
    console.log("URL: " + this.router.url)
    console.log("product: " + product)

    this.selectedProduct = product;
    console.log("Current product: " + this.selectedProduct)
    this.parseSpecifications(this.selectedProduct.specification);
    this.currentImagePath = this.getCurrentImagePath(0);

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
    this.currentImagePath = this.getCurrentImagePath(pageIndex);
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

  getCurrentImagePath(pageIndex : number){
    const imagePath = `assets/images/${this.selectedProduct.productType}/${this.selectedProduct.name}/${this.selectedProduct.imagesNames[pageIndex]}`;
    console.log("[getCurrentImagePath] imagePath: " + imagePath)
    return imagePath;
  }
}
