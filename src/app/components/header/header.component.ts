import { Component, OnInit } from '@angular/core';
import { IHetcher } from 'src/app/interfaces/IHetcher';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSessionActive = false;
  sessionData: IHetcher;
  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.sessionData.subscribe((sessionData) => {
      this.isSessionActive = true;
      this.sessionData = sessionData;
    });
  }
}
