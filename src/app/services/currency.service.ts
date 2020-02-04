import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { serverErrorHandle } from '../core/helpers/error-hadle';
import { environment } from '../../environments/environment';
import {Currency} from '../core/types/models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl =  environment.baseUrl + '/currencies';
  selectedCurrency = 'USD';
  currencies = [];

  constructor(
    private http: HttpClient
  ) { }

  getCurrencies() {
    return this.http.get<Currency[]>(this.apiUrl)
      .pipe(
        tap(response => {
          this.currencies = response;
        }),
        catchError(serverErrorHandle<Currency[]>([]))
      );
  }

  setSelectedCurrency(name: string) {
    this.selectedCurrency = name;
  }

  getConversionRate(): number {
    const selected = this.currencies.find(item => {
      return item.name === this.selectedCurrency;
    });

    return selected ? selected.conversion_rate : 1;
  }

  getConvertedValue(value: number): number {
    return value * this.getConversionRate();
  }

  getFormattedPrice(basePrice: number) {
    return (this.getConvertedValue(basePrice) / 100).toFixed(2);
  }

}
