import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = [];

  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response.data;
      });
  }

  selectedCurrencyName() {
    return this.currencyService.selectedCurrency;
  }

}
