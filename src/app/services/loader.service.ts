import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  state: Subject<boolean> = new Subject<boolean>();
  isLoading = false;
  constructor() {}
  showLoader() {
    this.setState(true);
    return this.isLoading;
  }

  hideLoader() {
    this.setState(false);
    return this.isLoading;
  }

  setState(state: boolean) {
    this.isLoading = state;
    this.state.next(this.isLoading);
  }
}
