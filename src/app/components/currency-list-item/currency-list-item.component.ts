import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../../core/types/models/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-list-item',
  templateUrl: './currency-list-item.component.html',
  styleUrls: ['./currency-list-item.component.scss']
})
export class CurrencyListItemComponent implements OnInit {
  @Input() currency: Currency;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
  }

  selectCurrency(e) {
    e.preventDefault();
    this.currencyService.setSelectedCurrency(this.currency.name);
  }

}
