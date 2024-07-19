import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercises } from '../../core/model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/exercises';

  getExercise(page?: number): Observable<IExercises> {
    if (page) {
      let params = new HttpParams().set('page', page);
      return this.http.get<IExercises>(this.url, { params });
    }
    return this.http.get<IExercises>(this.url);
  }
}
