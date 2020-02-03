import { Injectable } from '@angular/core';

import { CartItem } from '../core/types/models/cart';
import { Product } from '../core/types/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  constructor() { }

  addItem(product: Product, quantity: number) {
    const id = product.id;

    const cartItem = this.items.find(element => {
      return element.item.id === id;
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.items.push({
        item: product,
        quantity
      });
    }
  }

}
