import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

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
    private title: Title,
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

    this.http
      .post(environment.accounts + '/', credentials)
      .subscribe((response: IBackendResponse<any>) => {
        this.isLoading = false;
        if (response.status_code == '200') {
          this.session.setToken(response.data.jwt);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.reason || response.status_message;
        }
      });
  }

  ngOnInit() {
    this.title.setTitle('Create an account — Hetchfund');
  }
}
