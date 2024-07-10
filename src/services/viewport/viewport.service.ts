import { HostListener, Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  constructor(private ngZone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  onResizeScreen() {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.updateViewport();
      });
    }, 100);
  }

  updateViewport() {
    return window.innerWidth;
  }
}
