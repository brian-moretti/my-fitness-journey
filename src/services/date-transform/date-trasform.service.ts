import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTrasformService {
  constructor() {}

  trasformDateToDB(date: Date): string {
    return date ? date.toLocaleDateString().split('/').reverse().join('-') : '';
    /* 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
     */
  }

  trasformDateToView(date: Date): string {
    return date
      ? new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(date))
      : '';
  }
}
