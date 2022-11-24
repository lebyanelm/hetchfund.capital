import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
import { SessionService } from 'src/app/services/session.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // Field elements
  @ViewChild('NameField') nameField: ElementRef<HTMLInputElement>;
  @ViewChild('EmailAddressField')
  emailAddressField: ElementRef<HTMLInputElement>;
  @ViewChild('PasswordField') passwordField: ElementRef<HTMLInputElement>;

  isLoading = false;
  errorMessage: string;

  constructor(
    private titleService: TitleService,
    private http: HttpClient,
    private session: SessionService,
    private router: Router
  ) {}

  createAccount() {
    this.isLoading = true;

    const credentials = {
      display_name: this.nameField.nativeElement.value,
      email_address: this.emailAddressField.nativeElement.value,
      password: this.passwordField.nativeElement.value,
    };

    // Send a request to the accounts backend to create a hetcher.
    superagent
      .post(environment.accounts + '/')
      .send(credentials)
      .end((_, response) => {
        this.isLoading = false;
        if (response.statusCode == 200) {
          this.isLoading = false;
          this.session.setToken(response.body.data.jwt);
          this.router.navigate(['/choose-interests']);
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

  ngOnInit() {
    this.titleService.onTitleChange.next('Create an account — Hetchfund');
  }
}
