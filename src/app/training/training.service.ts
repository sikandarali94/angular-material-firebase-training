import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  changed = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  /* Because we have multiple subscriptions, it is suitable to place all those subscriptions within an array, as shown below.
   */
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  /* It is important to consider that we call fetchAvailableExercises() whenever the new-training component gets created. This would be
  the case whenever we navigate to it. However, when we navigate from it we never tear down the existing subscription which gets initialized
  in fetchAvailableExercises().
   */
  fetchAvailableExercises() {
    /* A big issue with our app right now is that when we log out of our app we get an authentication error. This is because we have live
    subscriptions still running when we log out of the app; and of course, the subscriptions to the Firebase database cannot be maintained
    because we have logged out from the app and thus we are not authenticated to maintain the connection with Firebase.
     */
    /* Even though we are pushing the subscriptions in a Subscription array, those subscriptions are still being subscribed to.
     */
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(
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
        /* The subscription is managed for us by Angularfire because it does not create multiple subscription of the same subscription
        whenever the new-training component is navigated from and back to again. It keeps the subscription singular even though the method
        that it is in is called multiple times.
         */
        this.availableExercises = exercises;
        this.changed.next([...this.availableExercises]);
      }));
      // , error => {
      //   // console.log(error);
      //   /* If we handle error in our subscription, as shown here, then we don't get the error on the JS console because it is being
      //   handled. Now this seems like a bad solution because we are just hiding the errors from the console rather than actually
      //   fixing them, however, it is okay. But there is a problem here through: if we got some other error and we want to show
      //   it to the user those errors are also hidden because of the empty error handling here. An alternative solution will be to store
      //   our subscriptions as we have implemented in this file.
      //    */
      // });
  }

  startExercise(selectId: string) {
    /* doc() method allows us to choose a specific document by passing the path of the document. This is handy especially if we don't want
    to interact or listen to an entire collection of documents but rather just a single one. update() method is used to add data to the
    existing data on the document rather than completely replace the data on the document.

    To get the complete list of methods to interact with documents on Firebase, we should visit the official documentation at:
    https://github.com/angular/angularfire2.
     */
    // this.db.doc('availableExercises/' + selectId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectId);
    /* We are emitting a copy of the runningExercise object using the spread operator.
     */
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
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

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscriptions() {
    /* We can now just call this method to unsubscribe the subscriptions to the Firebase database from the auth service when we log out from
    the app.
     */
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    /* If we connect to a collection in our database that does not exist yet, the collection is automatically created for us. We are
    using the add() function to add a document that holds the finished exercise onto the 'finishedExercises' collection in the Firebase
    database.
     */
    this.db.collection('finishedExercises').add(exercise);
  }
}
