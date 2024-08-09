import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercise } from '../../core/model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/exercises';

  //! VEDERE PER MAXDATA = 120
  getExercises(page?: number, filters?: {}): Observable<IExercise[]> {
    if (page) {
      let params = new HttpParams().set('page', page);
      return this.http.get<IExercise[]>(this.url, { params });
    }
    return this.http.get<IExercise[]>(this.url);
  }

  getSingleExercise(id: number): Observable<IExercise> {
    return this.http.get<IExercise>(`${this.url}/${id}`);
  }

  createExerciseUsingPost(exerciseInfo: IExercise): Observable<IExercise> {
    return this.http.post<IExercise>(this.url, exerciseInfo);
  }

  updateExerciseUsingPut(exerciseInfo: IExercise): Observable<IExercise> {
    return this.http.put<IExercise>(
      `${this.url}/${exerciseInfo.id}`,
      exerciseInfo
    );
  }

  deleteExerciseUsingDelete(id: number): Observable<IExercise> {
    return this.http.delete<IExercise>(`${this.url}/${id}`);
  }
}
