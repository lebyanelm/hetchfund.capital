import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBackendResponse } from '../interfaces/IBackendResponse';
import { IHetcher } from '../interfaces/IHetcher';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public sessionData: Subject<IHetcher> = new Subject<IHetcher>();
  public sessionToken: string;
  constructor(private http: HttpClient) {
    // Load the token from local storage when page reloads
    if (localStorage.getItem('session-token')) {
      this.setToken(localStorage.getItem('session-token'));
    }
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
          console.log(response.data);
          this.sessionData.next(response.data);
        } else {
          console.log('Something went wrong.', response.status_message);
        }
      });
  }

  removeToken() {}
}
