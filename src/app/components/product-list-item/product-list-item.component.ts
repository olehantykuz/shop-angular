import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../core/types/models/product';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: '[app-product-list-item]',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
  }

  getFormattedPrice() {
    return (this.currencyService.getConvertedValue(this.product.price))
      .toFixed(2);
  }

}
