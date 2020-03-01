import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NetworkService {

  online: boolean;

  constructor() {
    this.online = window.navigator.onLine;
    fromEvent(window, 'online').subscribe(e => {
      this.online = true;
    });

    fromEvent(window, 'offline').subscribe(e => {
     
      this.online = false;
      localStorage.setItem('isNetworkStopped','yes');
    });
  }
}