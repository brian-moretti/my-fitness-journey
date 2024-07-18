import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercises } from '../../core/model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/exercises';

  getExercise(params?: HttpParams): Observable<IExercises> {
    return this.http.get<IExercises>(this.url, { params });
  }
}
