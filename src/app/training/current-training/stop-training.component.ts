import { Component } from '@angular/core';

/* The dialog box of Angular Material is a special kind of component that is created programmatically in a TypeScript file rather than
  available as a directive, whose selector we can simply apply on our template
  */
@Component({
  selector: 'app-stop-training',
  /* To make text look nice, we can use the mat-dialog-title directive. The template is where we structure the dialog box.
   */
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-actions>
              <!--
              To close the dialog box, we can use the mat-dialog-close directive, as shown below.
              We can also bind a value to mat-dialog-close using property binding, a value that would be transferred to the component that
              opened the dialog box. It doesn't have to be a boolean, it can be any data.
              -->
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {}
