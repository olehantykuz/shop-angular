import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
        catchError(this.handleError<Currency[]>([]))
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

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}