import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  changed = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db.collection('availableExercises').snapshotChanges().pipe(
      map(
        docArray => {
          /* The map method below is not the rxjs operator.
           */
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        }
      ))
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.changed.next([...this.availableExercises]);
      });
  }

  startExercise(selectId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectId);
    /* We are emitting a copy of the runningExercise object using the spread operator.
     */
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
