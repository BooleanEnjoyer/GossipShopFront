import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LogService} from "../../../service/log/log.service";
import { Product } from 'src/app/entity/product/product';
import {AuthService} from "../../../service/user/auth/auth.service";
import { ProductService } from 'src/app/service/product/product-service.service';
import { generateMusicProducts } from './mock-products';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{ 

  products: Product[] = [];
  displayedProducts: Product[] = generateMusicProducts();
  selectedProduct !: Product;

  itemsPerPage = 4;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  sortOption = 'none';
  sortOrder = 'asc';
  findOption = 'sendProducts';
  isDetailsFormOpen = false;
  isFilterOpened = false;
  productNumber = 0;
  category = '';

  constructor(private router: Router, private route: ActivatedRoute,
    private logService: LogService, private authService: AuthService,
     private productService: ProductService) { }

  ngOnInit(): void {
      this.category = this.route.snapshot.paramMap.get('category') || '';
      console.log("CATEGORY: " + this.category)
      // this.getProducts(this.category);
  }

  isSender(){
    return this.findOption === 'sendProduct';
  }

  openDetailsForm(product: Product): void {
    this.selectedProduct = product;
    this.isDetailsFormOpen = true;
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

  //TODO czemu to jest robione po emailu? nie lepiej zamienić to na id?
  getProducts(category: string) {
      this.productService.getProducts(this.searchTerm,this.currentPage, this.itemsPerPage,
      this.sortOption, this.sortOrder, category)
      .subscribe((response: any) => {
        this.processResponseData(response);
      });
  }

  getProductPath(product: Product){
      console.log("Product type: " + product.productType)
      console.log("Product name: " + product.name)
      console.log("Product img path: " + product.imagesNames[0])
      const imagePath = `assets/images/${product.productType}/${product.name}/${product.imagesNames[0]}`;
      return imagePath;
  }

  search() {
    if(this.logService.isDebugEnabled()){
      console.log(this.findOption)
    }
    if(this.findOption === "Opaaa"){
      this.getProducts(this.category);
    }
  }

  private processResponseData(response: any) {
    this.products = response.content.map(
    (productData: any) => new Product(
      productData.id,
      productData.name,
      productData.price,
      productData.imagesPath,
      productData.imagesNames,
      productData.dateCrated,
      productData.description,
      productData.specification,
      productData.productType)
    );
    this.totalPages = response.totalPages;
    this.displayedProducts = this.products;
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.search();
  }
}
