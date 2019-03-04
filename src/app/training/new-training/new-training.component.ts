import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  /* We might think that the generic type Observable that we get should be Exercise[]. However, our model has an id property. This property
  is not part of the data we get returned from Firestore.
   */
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  exercisesLoaded = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    /* The collection method allows us to reach a specific collection in our Firestore database.
    The valueChanges() method will give us an observable and that is why are subscribing to it. This method is a listener that strips out
    all the metadata like the ID of each document within a collection and only gives us the values of each document.
     */
    /* The downside to valueChanges() is that it only gives us the value of our documents. However, when we use snapshotChanges() and we
    subscribe to the observable it returns, we get an array of objects that for example tells us what type of change occurred in the
    Firebase database; we also get a payload property in each object where we can access the id of the document. To get the value of the
    document we will have to execute an extra method to get the data that is inside the document. In summary: the snapshotChanges() allows
    us to get the metadata of our documents in the Firebase database.
     */
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingService.changed.subscribe(
      exercises => {
        this.availableExercises = exercises;
        if (this.availableExercises.length !== 0) {
          this.exercisesLoaded = true;
        }
      }
    );
    // .subscribe(
    //   result => {
    //     // /* Here we are looping through the array of objects and executing the special data() method to extract the value from each
    //     // document. With snapshotChanges() we got the best of both worlds: we can extract the metadata of our documents as well as their
    //     // value.
    //     //  */
    //     // for (const res of result) {
    //     //   console.log(res.payload.doc.data());
    //     // }
    //     console.log(result);
    //   }
    // )
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
