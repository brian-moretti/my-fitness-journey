import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercise } from '../../core/model';
import { IFilters } from '../../core/model/interface/filterExercises';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiUrl}/exercises`;
  private params = new HttpParams();

  getExercises(page?: number, filters?: IFilters): Observable<IExercise[]> {
    this.params = new HttpParams();
    if (page) {
      this.params = this.params.set('page', page);
    }
    if (filters) {
      if (filters.name) {
        this.params = this.params.set('name', filters.name);
      }
      if (filters.target) {
        this.params = this.params.set('target', filters.target);
      }
      if (filters.bodyPart) {
        this.params = this.params.set('bodyPart', filters.bodyPart);
      }
    }
    return this.http.get<IExercise[]>(this.url, { params: this.params });
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
