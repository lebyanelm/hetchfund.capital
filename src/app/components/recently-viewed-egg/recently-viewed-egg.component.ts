import { Component, OnInit } from '@angular/core';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-recently-viewed-egg',
  templateUrl: './recently-viewed-egg.component.html',
  styleUrls: ['./recently-viewed-egg.component.scss'],
})
export class RecentlyViewedEggComponent implements OnInit {
  percentage_funded = 0.1876;
  constructor(
    private currencyResolver: CurrencyResolverService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {}

  floor(n) {
    return n.toFixed(2);
  }
}
