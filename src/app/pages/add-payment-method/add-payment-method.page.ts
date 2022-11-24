import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICard } from 'src/app/interfaces/ICard';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit, AfterViewInit {
  @ViewChild('CardName') name: ElementRef<HTMLInputElement>;
  @ViewChild('CardNumber') number: ElementRef<HTMLInputElement>;
  @ViewChild('CardExpiry') expiry: ElementRef<HTMLInputElement>;
  @ViewChild('SecurityCode') securityCode: ElementRef<HTMLInputElement>;
  @ViewChild('DefaultMethodCheck')
  defaultMethodCheckbox: ElementRef<HTMLInputElement>;

  cardNumberError = false;

  constructor(
    private titleService: TitleService,
    private sessionService: SessionService,
    private loaderService: LoaderService
  ) {
    this.titleService.onTitleChange.next('Add a payment method | Hetchfund');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.number.nativeElement.onkeyup = (e) => {
      if (this.number.nativeElement.value.length === 16) {
        this.checkCreditCardNumber(this.number.nativeElement.value);
      } else {
        if (this.number.nativeElement.value.length < 16) {
          this.cardNumberError = false;
        } else {
          this.cardNumberError = true;
        }
      }
    };
  }

  addPaymentMethod() {}

  checkCreditCardNumber(number) {
    let even_sum = 0;
    let odd_sum = 0;

    // Firstly start with the double sum
    for (let i = 0; i <= number.length - 1; i = i + 2) {
      let sum_: any = parseInt(number[i]) * 2;
      if (sum_ >= 10) {
        sum_ = sum_.toString().split('');
        even_sum += parseInt(sum_[0]) + parseInt(sum_[1]);
        // alert('new sum ' + even_sum + ' for ' + i + ' i');
      } else {
        even_sum += sum_;
      }
    }

    for (let i = 1; i <= number.length - 1; i = i + 2) {
      odd_sum += parseInt(number?.[i]);
    }

    alert(
      even_sum +
        ' odd, ' +
        odd_sum +
        'even, ' +
        (even_sum + odd_sum) +
        ' total sum'
    );
  }
}
