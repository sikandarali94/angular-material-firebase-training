import { Component, OnInit } from '@angular/core';
/* We must import MatDialog from '@angular/material' before we can use it in our TypeScript file. However, before we do this, we also still
need to import the module that contains MatDialog into our app.
 */
import { MatDialog } from '@angular/material';
/* This is the component that contains our dialog box.
 */
import { StopTrainingComponent } from './stop-training.component';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  /* We inject MatDialog into the constructor method, as shown below.
   */
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    /* To trigger a dialog box, we use the open() method. We pass our dialog box component as an argument into this method.
     */
    /* To pass the data to the dialog box from the component that we opened it, we pass an object as a second argument that has a data
    key in which we pass the appropriate data that we want to pass to the dialog box.
     */
    /* To get data from the dialog box back to this component, we store it in a constant as shown below and then we use the afterClosed
    method on it.
     */
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    /* afterClosed() returns an observable that we can subscribe to to get data from the dialog box. In this case we decided to store the
    data we get back into the result variable, as shown below.
     */
    dialogRef.afterClosed().subscribe(result => {
      /* If the result variable is true, we should go back to the previous page. If the result is false then we want to resume the exercise
      timer.
       */
      if (result) {
        this.trainingService.trainingStarted.next(false);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
