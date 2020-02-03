import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../../core/types/models/cart';
import { CurrencyService } from '../../services/currency.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: '[app-cart-detail-item]',
  templateUrl: './cart-detail-item.component.html',
  styleUrls: ['./cart-detail-item.component.scss']
})
export class CartDetailItemComponent implements OnInit {
  @Input() product: CartItem;
  @Input() index: number;
  removedQuantity = 1;

  constructor(
    private currencyService: CurrencyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  formattedPrice() {
    return (this.currencyService.getConvertedValue(this.product.item.price))
      .toFixed(2);
  }

  productTotalPrice() {
    return (+this.formattedPrice() * this.product.quantity).toFixed(2);
  }

  removeProduct() {
    this.cartService.removeItem(this.product.item.id, this.removedQuantity);
  }

}
