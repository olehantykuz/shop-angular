import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../core/types/models/cart';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  items: CartItem[] = this.cartService.items;

  constructor(
    private currencyService: CurrencyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  selectedCurrencyName() {
    return this.currencyService.selectedCurrency;
  }

  getItems() {
    return this.items = this.cartService.items;
  }

  getTotalCost() {
    const totalCostInBaseCurrency = this.cartService.calculateTotalCost();

    return this.currencyService.getFormattedPrice(totalCostInBaseCurrency);
  }

}
