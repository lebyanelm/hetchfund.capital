import { Component, OnInit } from '@angular/core';
import { IEgg } from 'src/app/interfaces/IEgg';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { EggService } from 'src/app/services/egg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastManagerService } from 'src/app/services/toast-manager.service';

@Component({
  selector: 'app-recently-viewed-egg',
  templateUrl: './recently-viewed-egg.component.html',
  styleUrls: ['./recently-viewed-egg.component.scss'],
})
export class RecentlyViewedEggComponent implements OnInit {
  has_recently_viewed = false;
  is_closed = false; // Active when user closes this component
  recently_viewed_id;
  data: IEgg;

  constructor(
    public currencyResolver: CurrencyResolverService,
    public loaderService: LoaderService,
    public toastManager: ToastManagerService,
    private sessionService: SessionService,
    private eggService: EggService
  ) {}

  ngOnInit() {
    this.sessionService.sessionDataSubject.subscribe((sessionData) => {
      this.has_recently_viewed =
        sessionData?.recently_viewed.length > 0 || false;
      if (this.has_recently_viewed) {
        this.recently_viewed_id =
          sessionData?.recently_viewed[sessionData?.recently_viewed.length - 1];
        this.eggService.get(this.recently_viewed_id).then((data: IEgg) => {
          this.data = data;
        });
      }
    });
  }
}
