import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/entity/product/product';
import { LogService } from 'src/app/service/log/log.service';
import { ProductService } from 'src/app/service/product/product-service.service';
import { AuthService } from 'src/app/service/user/auth/auth.service';
import { generateMusicProducts } from '../product-list/mock-products';
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.css']
})
export class ProductBasketComponent implements OnInit {

  @Input() currentImagePath?: string;
  @Input() totalPages !: number;
  @Input() currentPage !: number;
  @Input() selectedProduct !: Product;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  products: Product[] = [];
  displayedProducts: Product[] = [];
  itemsPerPage = 4;
  searchTerm = '';
  sortOption = 'none';
  sortOrder = 'asc';
  isDetailsFormOpen = false;
  isFilterOpened = false;
  productNumber = 0;
  category = '';
  submitImagePath = 'assets/wallet.svg';
  noProductPath = 'assets/Musical_Dashboard_Logo.png'
  constructor(private router: Router, private route: ActivatedRoute,
    private logService: LogService, private authService: AuthService,
    private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.displayedProducts = this.shoppingCartService.getCartItems();
  }

  getProductPath(product: Product) {
    console.log("Product type: " + product.productType)
    console.log("Product name: " + product.name)
    console.log("Product img path: " + product.imagesNames[0])
    const imagePath = `assets/images/${product.productType}/${product.name}/${product.imagesNames[0]}`;
    return imagePath;
  }

  isProductBasketEmpty(){
    return this.displayedProducts.length === 0;
  }

  openDetailsForm(product: Product): void {
    this.selectedProduct = product;
    this.isDetailsFormOpen = true;
  }

  goToProductDetails(product: Product): void {
    const navigationExtras: NavigationExtras = {
      state: {
        product: product
      }
    };
    this.router.navigate(['/product/category', this.category, product.name], navigationExtras)
  }

  closeDetailsForm() {
    this.isDetailsFormOpen = false;
  }

  openFilter(): void {
    this.isFilterOpened = true;
  }

  closeFilter() {
    this.isFilterOpened = false;
    this.changePage(0);
  }

  search() {
    // if(this.logService.isDebugEnabled()){
    //   console.log(this.sea)
    // }
    // if(this.findOption === "Opaaa"){
    //   this.getProducts(this.category);
    // }
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.search();
  }

  submitForm() {
    this.formSubmitted.emit();
  }

  closeForm() {
    this.formClosed.emit();
  }
}
