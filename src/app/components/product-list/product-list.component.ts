import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { IPaginationLinks, IPaginationMeta } from '../../core/types/requests/collection-response';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = [];
  paginationLinks: IPaginationLinks;
  paginationMeta: IPaginationMeta;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.paginationLinks = this.productService.paginationLinks;
    this.paginationMeta = this.productService.paginationMeta;
    this.fetchProducts();
  }

  selectedCurrencyName() {
    return this.currencyService.selectedCurrency;
  }

  fetchProducts(url = null) {
    this.subscription = this.productService.getProducts(url)
      .subscribe(response => {
        this.products = response.data;
        this.paginationLinks = response.links;
        this.paginationMeta = response.meta;
      });
  }

  getProducts(e, url = null) {
    e.preventDefault();
    this.fetchProducts(url);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
