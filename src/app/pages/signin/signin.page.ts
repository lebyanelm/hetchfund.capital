import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
import { SessionService } from 'src/app/services/session.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, AfterViewInit {
  @ViewChild('EmailAddressField')
  emailAddressField: ElementRef<HTMLInputElement>;
  @ViewChild('PasswordField') passwordField: ElementRef<HTMLInputElement>;

  isLoading: boolean = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private titleService: TitleService
  ) {}
  ngOnInit() {}

  signin() {
    // Structure the credentials data for sending
    const credentials = {
      email_address: this.emailAddressField.nativeElement.value,
      password: this.passwordField.nativeElement.value,
      is_persist: true,
    };

    // Send the credentials for confirmation
    superagent
      .post([environment.accounts, 'authentication'].join('/'))
      .send(credentials)
      .end((_, response) => {
        if (response.statusCode == 200) {
          this.emailAddressField.nativeElement.value = '';
          this.passwordField.nativeElement.value = '';

          // Store the JWT locally for future logins
          this.sessionService.setToken(response.body.data.jwt);
          this.router.navigateByUrl('/companies');
        } else {
          this.errorMessage = [
            response.body.status_message,
            ' by ',
            response.body.cluster_pod,
            '. Please make necessary changes and try again, if error persists contact us.',
          ].join('');
        }
      });
  }

  ngAfterViewInit() {
    this.titleService.onTitleChange.next('Signin to your account — Hetchfund');
  }
}
