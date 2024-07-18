import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private viewScreenSubject = new Subject<number>();
  viewScreen$ = this.viewScreenSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.onResizeScreen();
  }

  private onResizeScreen() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.viewScreenSubject.next(window.innerWidth);
        });
      }, 100);
    });
  }
}
