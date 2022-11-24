import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBackendResponse } from '../interfaces/IBackendResponse';
import { IHetcher } from '../interfaces/IHetcher';
import { ToastManagerService } from './toast-manager.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public sessionDataSubject: Subject<IHetcher> = new Subject<IHetcher>();
  public data: IHetcher;
  public sessionToken: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastManagerService
  ) {
    // Load the token from local storage when page reloads
    if (localStorage.getItem('session-token')) {
      this.setToken(localStorage.getItem('session-token'));
    }

    this.sessionDataSubject.subscribe((d) => (this.data = d));
  }
  setToken(token) {
    this.sessionToken = token;

    // Store the session token via LocalStorage
    localStorage.setItem('session-token', this.sessionToken);
    this.getSessionData();
  }

  getSessionData() {
    this.http
      .get([environment.accounts, 'authentication', 're'].join('/'), {
        headers: {
          Authorization: 'Bearer ' + this.sessionToken,
        },
      })
      .subscribe((response: IBackendResponse<any>) => {
        if (response.status_code == '200') {
          this.sessionDataSubject.next(response.data);
        } else {
          console.log('Something went wrong.', response.status_message);
        }
      });
  }

  updateSessionData(data: IHetcher) {
    this.sessionDataSubject.next(data);
  }

  removeSession() {
    this.toastService.show('Signing you out...');

    // Remove user related data
    this.sessionDataSubject.next(null);
    this.sessionToken = null;
    localStorage.removeItem('session-token');
    localStorage.removeItem('default_currency_previous_timestamp');
    localStorage.removeItem('default_currency');
    localStorage.removeItem('default_currency_previous_value');

    // Route the user out to the sign in page
    this.router.navigate(['signin']);
  }
}
