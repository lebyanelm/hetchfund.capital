import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as superagent from 'superagent';
import { ERROR_MESSAGES } from '../error_messages';
import { SessionService } from './session.service';
import { ToastManagerService } from './toast-manager.service';

@Injectable({
  providedIn: 'root',
})
export class EggService {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private toastService: ToastManagerService
  ) {}

  get(
    eggKeys,
    enableRecent: number | boolean = false,
    enableInterest: number | boolean = false
  ) {
    return new Promise((resolve, reject) => {
      if (this.sessionService.sessionToken) {
        enableRecent = false;
        enableInterest = false;
      } else {
        enableRecent = true;
        enableInterest = true;
      }

      if (typeof eggKeys === 'string') eggKeys = [eggKeys];

      const companyRequest = superagent.get(
        [
          environment.farmhouse,
          [
            eggKeys.join('^'),
            [
              'enable_recent=' + enableRecent,
              'enable_interest=' + enableInterest,
            ].join('&'),
          ].join('?'),
        ].join('/')
      );

      if (this.sessionService.sessionToken) {
        companyRequest.set(
          'Authorization',
          ['Bearer', this.sessionService.sessionToken].join(' ')
        );
      }

      companyRequest.end((_, response) => {
        if (response.statusCode == 200) {
          resolve(response.body.data);
        } else {
          this.router.navigateByUrl(['/errors', response.statusCode].join('/'));
        }
      });
    });
  }

  bookmark(eggKey) {
    return new Promise((resolve) => {
      if (this.sessionService.sessionToken) {
        superagent
          .put([environment.farmhouse, eggKey, 'bookmark'].join('/'))
          .set(
            'Authorization',
            ['Bearer', this.sessionService.sessionToken].join(' ')
          )
          .end((_, response) => {
            if (response) {
              if (response.statusCode == 200) {
                resolve(response.body.data);
              } else {
                this.toastService.show(
                  response.body.data.reason || ERROR_MESSAGES.UNEXPECTED_ERROR
                );
              }
            } else {
              this.toastService.show(ERROR_MESSAGES.NO_INTERNET);
            }
          });
      } else {
        this.router.navigate(['signin'], {
          queryParams: { completeAction: 'bookmark', key: eggKey },
        });
      }
    });
  }

  getRelated(primaryCategory, secondaryCategory) {
    return new Promise((resolve, reject) => {
      superagent
        .get(
          [
            environment.farmhouse,
            'categories',
            primaryCategory.replace(/\s/g, '_').replace(/\//g, '^'),
            secondaryCategory.replace(/\s/g, '_').replace(/\//g, '^'),
          ].join('/')
        )
        .end((_, response) => {
          if (response) {
            if (response.statusCode == 200) {
              resolve(response.body.data);
            } else {
              reject(response.body.reason || ERROR_MESSAGES.UNEXPECTED_ERROR);
            }
          } else {
            reject(ERROR_MESSAGES.NO_INTERNET);
          }
        });
    });
  }

  recommended(count = 15) {
    return new Promise((resolve, reject) => {
      superagent
        .get([environment.farmhouse, 'recommended?count=' + count].join('/'))
        .set(
          'Authorization',
          ['Bearer', this.sessionService.sessionToken].join(' ')
        )
        .end((_, response) => {
          if (response) {
            if (response.statusCode == 200) {
              resolve(response.body.data);
            } else {
              reject(response.body.data.reason || 'Something went wrong.');
            }
          } else {
            reject(ERROR_MESSAGES.NO_INTERNET);
          }
        });
    });
  }
}
