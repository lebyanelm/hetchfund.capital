import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEgg } from 'src/app/interfaces/IEgg';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { EggService } from 'src/app/services/egg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-choose-pledge-options',
  templateUrl: './choose-pledge-options.page.html',
  styleUrls: ['./choose-pledge-options.page.scss'],
})
export class ChoosePledgeOptionsPage implements OnInit {
  commitmentOptions = [
    {
      commitment_amount: 10,
      rewards_description: "You'll earn +1 points of hetcher reputation.",
      index: 1,
    },
    {
      commitment_amount: 20,
      rewards_description: "You'll earn +2 points of hetcher reputation.",
      index: 2,
    },
    {
      commitment_amount: 30,
      rewards_description: "You'll earn +3 points of hetcher reputation.",
      index: 3,
    },
    {
      commitment_amount: 40,
      rewards_description: "You'll earn +4 points of hetcher reputation.",
      index: 4,
    },
  ];

  selectedCommitment: number = 1;
  customCommitment = '0';

  // Company details
  data: IEgg;
  contract_key: string;

  constructor(
    private titleService: TitleService,
    public currencyService: CurrencyResolverService,
    private eggService: EggService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.onTitleChange.next('Choose a commitment | Hetchfund');
    this.loaderService.showLoader();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contract_key = params.get('contract_key');
      this.eggService
        .get(this.contract_key)
        .then((data) => {
          this.loaderService.hideLoader();
          this.data = data;
        })
        .catch((e) => {
          this.loaderService.hideLoader();
          this.router.navigate(['errors', 500], { queryParams: e });
        });
    });
  }

  selectCommitment(index: number) {
    this.selectedCommitment = index;
  }

  choosePaymentMethod() {
    this.router.navigate(
      ['contracts', this.contract_key, 'commitment', 'choose-method'],
      {
        queryParams: {
          commitment_index:
            this.commitmentOptions[this.selectedCommitment].index,
        },
        replaceUrl: true,
      }
    );
  }

  isValidInput(n) {
    return isNaN(parseInt(n));
  }
  toInteger(n) {
    return parseFloat(n);
  }
}
