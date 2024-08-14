import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';

@Injectable({
  providedIn: 'root',
})
export class ExercisesTrainingService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/exercises-training';

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
    return this.http.put<IExerciseTraining>(
      `${this.url}/${exerciseTraining.id_exercise}`,
      exerciseTraining,
      { withCredentials: true }
    );
  }

  deleteExerciseTraining(
    exerciseTraining: IExerciseTraining
  ): Observable<IExerciseTraining> {
    return this.http.delete<IExerciseTraining>(
      `${this.url}/${exerciseTraining.id_exercise}`,
      { withCredentials: true }
    );
  }
}
