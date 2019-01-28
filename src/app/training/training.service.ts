import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectId);
    /* We are emitting a copy of the runningExercise object using the spread operator.
     */
    this.exerciseChanged.next({...this.runningExercise});
  }
}
