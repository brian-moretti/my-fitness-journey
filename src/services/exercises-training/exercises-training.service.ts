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

  getSingleExerciseTraining() {}

  updateExerciseTraining(exerciseTraining: IExerciseTraining) {
    return this.http.put(
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
