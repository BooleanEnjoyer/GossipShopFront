import { Injectable } from '@angular/core';
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

  getCartItems(): Product[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
