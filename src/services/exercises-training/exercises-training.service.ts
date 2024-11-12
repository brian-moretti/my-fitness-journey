import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesTrainingService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiUrl}/exercises-training`;

  getSingleExerciseTraining(exerciseID: number): Observable<IExerciseTraining> {
    return this.http.get<IExerciseTraining>(`${this.url}/${exerciseID}`, {
      withCredentials: true,
    });
  }

  createExerciseTraining(
    exerciseTraining: IExerciseTraining
  ): Observable<IExerciseTraining> {
    return this.http.post<IExerciseTraining>(this.url, exerciseTraining, {
      withCredentials: true,
    });
  }

  updateExerciseTraining(
    exerciseTraining: IExerciseTraining
  ): Observable<IExerciseTraining> {
    console.log(exerciseTraining.exercise?.id);

    return this.http.put<IExerciseTraining>(
      `${this.url}/${exerciseTraining.exercise?.id}`,
      exerciseTraining,
      { withCredentials: true }
    );
  }

  deleteExerciseTraining(
    exerciseTraining: IExerciseTraining
  ): Observable<IExerciseTraining> {
    return this.http.delete<IExerciseTraining>(
      `${this.url}/${exerciseTraining.exercise?.id}`,
      { withCredentials: true }
    );
  }
}
