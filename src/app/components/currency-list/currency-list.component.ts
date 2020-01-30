import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencies = [];

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .subscribe(response => {
        this.currencies = response;
      });
  }

  getSelectedCurrency() {
    return this.currencyService.selectedCurrency;
  }

}
