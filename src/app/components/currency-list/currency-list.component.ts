import {Component, OnDestroy, OnInit} from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  currencies = [];
  subscription: Subscription;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.subscription = this.currencyService.getCurrencies()
      .subscribe(response => {
        this.currencies = response;
      });
  }

  getSelectedCurrency() {
    return this.currencyService.selectedCurrency;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
