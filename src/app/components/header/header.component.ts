import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { IHetcher } from 'src/app/interfaces/IHetcher';
import { CurrencyResolverService } from 'src/app/services/currency-resolver.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('CurrencyDropdownAnchor')
  currencyDropdownAnchor: ElementRef<HTMLAnchorElement>;
  @ViewChild('ProfileDropdownAnchor')
  profileDropdownAnchor: ElementRef<HTMLAnchorElement>;
  @Input() hasBackground = true;

  isSessionActive = false;
  isUnableToLoadCurrencies = false;
  availableCurrencies: ICurrency[] = [];

  constructor(
    public sessionService: SessionService,
    public currencyService: CurrencyResolverService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.sessionService.sessionDataSubject.subscribe(() => {
      this.isSessionActive = true;

      // Since the profile dropdowns becomes available when sessions is confirmed
      setTimeout(
        () => this.activateDropdownAnchor(this.profileDropdownAnchor, 1),
        20
      );
    });
    this.loadPossibleCurrencies();

    // When a currency is being disired for change in funding amount clickables
    this.currencyService.currencyMenuState.subscribe((v) => {
      if (v) {
        if (this.availableCurrencies.length == 0) {
          this.loadPossibleCurrencies();
        }
        this.currencyDropdownAnchor.nativeElement.click();
      }
    });
  }

  ngAfterViewInit(): void {
    // Activate the dropdowns
    this.activateDropdownAnchor(this.currencyDropdownAnchor, 0);
  }

  activateDropdownAnchor(
    dropdownAnchor: ElementRef<HTMLAnchorElement>,
    dropdownIndex
  ) {
    if (dropdownAnchor) {
      dropdownAnchor.nativeElement.onclick = () => {
        // On subsequent dropdown opens; check if currencies were loaded; if not try to load them again.
        if (
          !dropdownAnchor.nativeElement.classList.contains('open') &&
          this.availableCurrencies.length === 0 &&
          dropdownIndex === 0
        ) {
          this.loadPossibleCurrencies();
        }

        dropdownAnchor.nativeElement.classList.toggle('open');
      };

      dropdownAnchor.nativeElement.onmouseleave = () => {
        dropdownAnchor.nativeElement.classList.remove('open');
      };
    }
  }

  loadPossibleCurrencies() {
    // Reset the error state.
    this.isUnableToLoadCurrencies = false;

    superagent
      .get([environment.translator, 'all'].join('/'))
      .end((_, response) => {
        if (response?.statusCode == 200) {
          const currencyCodes = Object.keys(response.body.data);
          for (const currencyCode of currencyCodes) {
            this.availableCurrencies.push({
              name: response.body.data[currencyCode],
              code: currencyCode,
            });
          }
        } else {
          this.isUnableToLoadCurrencies = true;
          console.error('Unable to load available currencies.');
        }
      });
  }
}
