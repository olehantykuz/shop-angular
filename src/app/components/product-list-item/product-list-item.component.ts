import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../core/types/models/product';
import { CurrencyService } from '../../services/currency.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: '[app-product-list-item]',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  quantity = 1;

  constructor(
    private currencyService: CurrencyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  getFormattedPrice() {
    return (this.currencyService.getConvertedValue(this.product.price))
      .toFixed(2);
  }

  addToCart() {
    this.cartService.addItem(this.product, +this.quantity);
  }

}
