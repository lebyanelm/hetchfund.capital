import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyResolverService {
  SERVICE_API_ENDPOINT = "https://apis.hetchfund.capital/translator"
  default_currency = "USD"
  currency = null
  value = 1
  
  constructor(private http: HttpClient) {
    this.currency = this.default_currency;
    this.setCurrency(this.default_currency)
  }

  setCurrency(currency) {
    this.http.get([this.SERVICE_API_ENDPOINT, "translate", 1, currency].join("/"))
        .subscribe((response: any) => {
          if (response.status_code == 200) {
            this.value = response.data.to_amount;
            this.currency = currency;
          }
        })
  }
}
