import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoaderService } from './services/loader.service';
import { TitleService } from './services/title.service';
import { ToastManagerService } from './services/toast-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoaderShown = false;
  constructor(
    private loaderService: LoaderService,
    private titleService: TitleService,
    private title: Title,
    public toastManager: ToastManagerService
  ) {
    this.isLoaderShown = this.loaderService.isLoading;
    this.loaderService.state.subscribe((state) => (this.isLoaderShown = state));
    this.titleService.onTitleChange.subscribe((title) =>
      this.title.setTitle(title)
    );
  }
}
