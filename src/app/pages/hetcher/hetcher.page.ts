import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
import { IHetcher } from 'src/app/interfaces/IHetcher';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hetcher',
  templateUrl: './hetcher.page.html',
  styleUrls: ['./hetcher.page.scss'],
})
export class HetcherPage implements OnInit {
  isCuratedCampaigns = true;
  username: string;
  hetcher: IHetcher;
  isFound = false;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      // Read the username from the URL
      this.username = params.get('username');

      // Get the data from the "backend"
      this.http
        .get([environment.accounts, this.username].join('/'))
        .subscribe((response: IBackendResponse<IHetcher>) => {
          if (response.status_code == '200') {
            this.hetcher = response.data;
            this.hetcher.eggs = ['21'];
            this.isFound = true;
            this.title.setTitle(this.hetcher.display_name + ' — Hetchfund');
          } else {
            if (response.status_code == '404') {
              this.isFound = false;
              this.title.setTitle(this.username + ' Not Found — Hetchfund');
            } else {
              this.router.navigate(['errors', response.status_code]);
            }
          }
        });
    });
    // this.title.setTitle('Hetcher Profile | Hetchfund');
  }

  determineLevelEnding(value) {
    const s = ['th', 'st', 'nd', 'rd'],
      v = value % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
}
