import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICard } from 'src/app/interfaces/ICard';
import { IEgg } from 'src/app/interfaces/IEgg';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { SessionService } from 'src/app/services/session.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.page.html',
  styleUrls: ['./choose-payment-method.page.scss'],
})
export class ChoosePaymentMethodPage implements OnInit {
  paymentMethods: ICard[] = [
    {
      _id: 1,
      number: '**** **** **** /7120',
      holder: 'MR LM LEBYANE',
      cvv: '***/*',
      exp_year: '2029',
      exp_month: '09',
      payment_brand: 'MASTERCARD',
      is_default: true,
    },
    {
      _id: 2,
      number: '**** **** **** /7832',
      holder: 'TOWARDS COMMON FOUNDRY, LTD',
      cvv: '***/*',
      exp_year: '2030',
      exp_month: '09',
      payment_brand: 'VISA',
      is_default: false,
    },
  ];

  selectedPaymentId;

  // Company details
  contract_key: string;
  commitment_index: string;

  constructor(
    private titleService: TitleService,
    public currencyService: CurrencyResolverService,
    public sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.onTitleChange.next('Choose a payment method | Hetchfund');
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contract_key = params.get('contract_key');
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.commitment_index = params.get('commitment_index');
    });

    // Automatically select the default payment method, or select the first one.
    for (let i = 0; i <= this.paymentMethods.length; i++) {
      if (this.paymentMethods[i].is_default) {
        this.selectedPaymentId = this.paymentMethods[i]._id;
        break;
      }
    }
    if (this.selectedPaymentId === null) {
      if (this.paymentMethods.length) {
        this.selectedPaymentId = this.paymentMethods[0]._id;
      }
    }
  }

  selectPaymentMethod(paymentId) {
    this.selectedPaymentId = paymentId;
  }

  finalizePayment() {
    this.router.navigate(
      ['contracts', this.contract_key, 'commitments', 'choose-method'],
      {
        queryParams: { commitment_index: this.commitment_index },
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
