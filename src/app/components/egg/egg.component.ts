import { Component, OnInit } from '@angular/core';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';

@Component({
  selector: 'app-egg',
  templateUrl: './egg.component.html',
  styleUrls: ['./egg.component.scss'],
})
export class EggComponent implements OnInit {

  constructor(public currencyResolver: CurrencyResolverService) { }

  ngOnInit() {}

  toLocaleString(number: number): string {
    return number.toLocaleString()
  }
}
