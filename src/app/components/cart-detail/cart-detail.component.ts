import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  constructor(
    private currencyService: CurrencyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  get selectedCurrencyName() {
    return this.currencyService.selectedCurrency;
  }

  get items() {
    return this.cartService.items;
  }

  get totalCost() {
    const totalCostInBaseCurrency = this.cartService.calculateTotalCost();

    return this.currencyService.getFormattedPrice(totalCostInBaseCurrency);
  }

}
