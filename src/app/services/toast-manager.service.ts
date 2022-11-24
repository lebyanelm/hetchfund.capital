import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastManagerService {
  currentMessages: any[] = [];
  persistantMessage: any;
  messageTimeout = 4000; // in ms

  constructor() {}

  show(message, isPersist: boolean = false) {
    if (isPersist === false) {
      const pushIndex = this.currentMessages.push({
        isPersist,
        message,
      });

      console.log(pushIndex);

      setTimeout(() => {
        this.currentMessages.splice(pushIndex - 1, 1);
      }, this.messageTimeout);
    } else {
      if (this.persistantMessage) {
        this.show(this.persistantMessage.message);
      }

      this.persistantMessage = {
        isPersist,
        message,
      };
    }
  }
}
