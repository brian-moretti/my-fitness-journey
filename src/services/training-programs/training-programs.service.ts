import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';

@Injectable({
  providedIn: 'root',
})
export class TrainingProgramsService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/training-programs';

  getTrainingPrograms(): Observable<ITrainingProgram[]> {
    return this.http.get<ITrainingProgram[]>(this.url, {
      withCredentials: true,
    });
  }

  getSingleTrainingProgram(): Observable<ITrainingProgram> {
    return this.http.get<ITrainingProgram>(this.url, { withCredentials: true });
  }

  createTrainingProgram(
    program: ITrainingProgram
  ): Observable<ITrainingProgram> {
    return this.http.post<ITrainingProgram>(this.url, program, {
      withCredentials: true,
    });
  }

  updateTrainingProgram(
    program: ITrainingProgram
  ): Observable<ITrainingProgram> {
    return this.http.put<ITrainingProgram>(
      `${this.url}/${program.id}`,
      program,
      { withCredentials: true }
    );
  }

  deleteTrainingProgram(id: number): Observable<ITrainingProgram> {
    return this.http.delete<ITrainingProgram>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }
}
