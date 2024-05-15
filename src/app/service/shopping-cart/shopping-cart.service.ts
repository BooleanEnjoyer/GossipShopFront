import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs';
import { Product } from 'src/app/entity/product/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: Product[] = [];

  constructor() { }

  addToCart(product: Product): void {
    this.cartItems.push(product);
  }

  isCartEmpty(){
    return this.cartItems.length === 0
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
