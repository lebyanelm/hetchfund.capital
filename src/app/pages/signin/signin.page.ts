import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
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

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  signin() {
    // Structure the credentials data for sending
    const credentials = {
      username: this.emailAddressField.nativeElement.value,
      password: this.passwordField.nativeElement.value,
      is_persist: true,
    };

    // Send the credentials for confirmation
    this.http
      .post([environment.accounts, 'authentication'].join('/'), credentials)
      .subscribe((response: IBackendResponse<any>) => {
        console.log(response);
      });
  }

  ngAfterViewInit() {}
}
