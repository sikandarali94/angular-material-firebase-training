import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
/* To use AngularFirestore package within our Typescript file, we first need to import it from:'angularfire2/firestore'.
 */
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  /* We might think that the generic type Observable that we get should be Exercise[]. However, our model has an id property. This property
  is not part of the data we get returned from Firestore.
   */
  availableExercises: Observable<any>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {}

  ngOnInit() {
    /* The collection method allows us to reach a specific collection in our Firestore database.
    The valueChanges() method will give us an observable and that is why are subscribing to it. This method is a listener that strips out
    all the metadata like the ID of each document within a collection and only gives us the values of each document.
     */
    this.availableExercises = this.db.collection('availableExercises').valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
