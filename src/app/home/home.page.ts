import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleService } from '../services/title.service';
import * as superagent from 'superagent';
import { SessionService } from '../services/session.service';
import { environment } from 'src/environments/environment';
import { ToastManagerService } from '../services/toast-manager.service';
import { IEgg } from '../interfaces/IEgg';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private titleService: TitleService,
    private sessionService: SessionService,
    private toastService: ToastManagerService
  ) {}

  recommended: IEgg[] = [];
  isLoadingRecommended = false;

  ngOnInit(): void {
    this.titleService.onTitleChange.next('Browse contracts | Hetchfund');

    // Get recommended campainging eggs
    let sessionToken = this.sessionService.sessionToken;
    if (sessionToken) {
      sessionToken = ['Bearer', sessionToken].join(' ');
    } else {
      sessionToken = null;
    }
    console.log(sessionToken);

    this.isLoadingRecommended = true;
    superagent
      .get([environment.farmhouse, 'recommended'].join('/'))
      .set('Authorization', sessionToken)
      .end((_, response) => {
        this.isLoadingRecommended = false;
        if (response) {
          if (response.statusCode == 200) {
            this.recommended = response.body.data;
          } else {
            this.toastService.show(
              response.body.data.reason || 'Something went wrong.'
            );
          }
        } else {
          this.toastService.show("You're not connected to the internet.");
        }
      });
  }
}
