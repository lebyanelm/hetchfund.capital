import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IEgg } from 'src/app/interfaces/IEgg';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { EggService } from 'src/app/services/egg.service';
import { SessionService } from 'src/app/services/session.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';

@Component({
  selector: 'app-egg-campaign',
  templateUrl: './egg-campaign.page.html',
  styleUrls: ['./egg-campaign.page.scss'],
})
export class EggCampaignPage implements OnInit {
  eggKey: string;
  data: IEgg;
  sessionToken: string;
  isbookmarked = false;

  // Related companies in the same field as this one
  related: IEgg[] = [];
  isLoadingRelated = true;

  // Tab management
  activeTab = 'about';

  // Comments management
  comments = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public currencyResolver: CurrencyResolverService,
    private titleService: TitleService,
    private eggService: EggService,
    public sessionService: SessionService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.eggKey = params.get('contract_key');

      this.sessionService.sessionDataSubject.subscribe(() => {
        this.eggService.get(this.eggKey, true).then((data: IEgg) => {
          this.data = data;
          this.data.presentation_video =
            'https://embed.api.video/vod/vi19ToK0jdEw9kvWPl9OPt9Y';
          this.isbookmarked = this.data?.bookmarks.includes(
            this.sessionService.data?.email_address
          );
          this.titleService.onTitleChange.next(
            [this.data?.name, 'Hetchfund'].join(' | ')
          );

          // Find companies related to this one
          this.getRelated();
        });
      });
    });
  }

  bookmark() {
    this.eggService.bookmark(this.data.key).then((responseData: IEgg) => {
      this.data = responseData;
      this.isbookmarked = this.data.bookmarks.includes(
        this.sessionService.data?.email_address
      );
    });
  }

  getRelated() {
    this.isLoadingRelated = true;
    this.eggService
      .getRelated(this.data?.primary_category, this.data?.secondary_category)
      .then((related: IEgg[]) => {
        this.isLoadingRelated = false;
        this.related = related;
      });
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
