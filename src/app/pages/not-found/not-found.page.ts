import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  providers: [],
})
export class NotFoundPage implements OnInit {
  error_code = 500;
  error_title = 'Something went wrong.';
  error_message =
    'We are experiencing \
                difficulties handling your request at the moment.';
  constructor(public route: ActivatedRoute, public title: Title) {
    // Grab error code from the navigation params
    let navParamsErrorCode = this.route.snapshot.paramMap.get('error_code');
    if (!isNaN(Number(navParamsErrorCode)))
      this.error_code = Number(navParamsErrorCode);

    // Build the error message according to error code
    if (this.error_code == 404) {
      this.error_title = 'Not found.';
      this.error_message =
        "Our apologies. The page you're looking for \
                          is currently unavailable at the moment. \
                          Please check for any mispellings.";
    } else if (this.error_code == 403) {
      this.error_title = 'Unauthorized.';
      this.error_message =
        "Opps. You don't have enough privilages to access \
                          this page. Please log in to your account if not already.";
    } else if (this.error_code == 400 || this.error_code == 501) {
      this.error_title = 'Bad request.';
      this.error_message =
        'Opps. Bad request reached on our side, please make \
                          sure you used proper instructions.';
    }

    this.title.setTitle(this.error_title + ' — Hetchfund');
  }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {}
}
