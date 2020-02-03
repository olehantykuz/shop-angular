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
    const cartItem = this.findById(product.id);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.items.push({
        item: product,
        quantity
      });
    }
  }

  removeItem(id: number, quantity: number) {
    const cartItem = this.findById(id);

    if (cartItem) {
      if (quantity >= cartItem.quantity) {
        this.items = this.items.filter(el => {
          return el.item.id !== id;
        });
      } else {
        cartItem.quantity -= quantity;
      }
    }
  }

  findById(id: number) {
    return this.items.find(element => {
      return element.item.id === id;
    });
  }

  calculateTotalCost() {
    let totalCost = 0;

    this.items.forEach(value => {
      totalCost += value.quantity * value.item.price;
    });

    return totalCost;
  }

}
