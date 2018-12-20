import { Component, OnInit } from '@angular/core';
/* We must import MatDialog from '@angular/material' before we can use it in our TypeScript file. However, before we do this, we also still
need to import the module that contains MatDialog into our app.
 */
import { MatDialog } from '@angular/material';
/* This is the component that contains our dialog box.
 */
import { StopTrainingComponent } from './stop-training.component';

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
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        /* Timer will stop when we progress has a value of 100 or above.
         */
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    /* To trigger a dialog box, we use the open() method. We pass our dialog box component as an argument into this method.
     */
    this.dialog.open(StopTrainingComponent);
  }

}
