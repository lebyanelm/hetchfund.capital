import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoaderShown = false;
  constructor(private loaderService: LoaderService) {
    this.isLoaderShown = this.loaderService.isLoading;
    this.loaderService.state.subscribe((state) => (this.isLoaderShown = state));
  }
}
