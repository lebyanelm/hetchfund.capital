import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as currencyFormater from 'currency-formatter';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';
import * as superagent from 'superagent';

@Injectable({
  providedIn: 'root',
})
export class CurrencyResolverService {
  currencyMenuState: Subject<boolean> = new Subject<boolean>();
  SERVICE_API_ENDPOINT = environment.translator;

  currency: string;
  value: number;

  // Load default currency; else use ZAR.
  default_currency = localStorage.getItem('default_currency')
    ? localStorage.getItem('default_currency')
    : 'ZAR';

  // Load default selected currency conversion rate; else use 1.
  default_value = localStorage.getItem('default_currency_previous_value')
    ? parseFloat(localStorage.getItem('default_currency_previous_value'))
    : 1;

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    this.currency = this.default_currency;
    this.value = this.default_value;

    this.setCurrency(this.default_currency);
  }

  setCurrency(currency, isForced = false) {
    if (
      localStorage.getItem('default_currency_previous_timestamp') &&
      isForced === false
    ) {
      const previousTimestamp = parseInt(
          localStorage.getItem('default_currency_previous_timestamp')
        ),
        lastUpdateTimeDifference = Date.now() - previousTimestamp,
        timeDifferenceInHours = lastUpdateTimeDifference / 3.6e6;

      // Refresh for exchange rate updates if an hour has passed.
      if (timeDifferenceInHours >= 1) {
        this.loadCurrencyExchangeRates(currency);
      }
    } else {
      this.loadCurrencyExchangeRates(currency);
    }
  }

  loadCurrencyExchangeRates(currency) {
    this.loaderService.showLoader();
    superagent
      .get([this.SERVICE_API_ENDPOINT, 'translate', 1, currency].join('/'))
      .end((_, response) => {
        this.loaderService.hideLoader();
        if (response.statusCode == 200) {
          this.value = response.body.data.to_amount;
          this.currency = currency;

          // Save the set currency for subsequent refreshes
          this.saveCurrentCurrency();
        }
      });
  }

  saveCurrentCurrency() {
    localStorage.setItem('default_currency', this.currency);
    localStorage.setItem(
      'default_currency_previous_value',
      this.value.toString()
    );

    // Will be used to calculate difference in last time updated.
    localStorage.setItem(
      'default_currency_previous_timestamp',
      Date.now().toString()
    );
  }

  translate(n) {
    return currencyFormater.format(parseFloat(n) * this.value, {
      code: this.currency,
    });
  }

  showCurrencyMenu() {
    this.currencyMenuState.next(true);
  }
}
