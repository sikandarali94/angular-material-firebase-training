/* Inject has to be imported from '@angular/core' before we can use it in our Typescript file.
 */
import {Component, Inject} from '@angular/core';
/* MAT_DIALOG_DATA is a constant that stores a random number or id which allows us to access that data which Angular Material internally
stores when we call the .open() method within the component from where we open the dialog box. This setting up of data is kind of like a
service which Angular Material internally sets up and assigns an id so we can access the data inside that service.
 */
import { MAT_DIALOG_DATA } from '@angular/material';

/* The dialog box of Angular Material is a special kind of component that is created programmatically in a TypeScript file rather than
  available as a directive, whose selector we can simply apply on our template
  */
@Component({
  selector: 'app-stop-training',
  /* To make text look nice, we can use the mat-dialog-title directive. The template is where we structure the dialog box.
   */
  /* For {{ passedData.progress }}, if we want Angular to get the data to evaluate this string interpolation, we have to configure the dialog box
  in the component that we open it from.
   */
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-content>
              <p>You already got {{ passedData.progress }}%</p>
            </mat-dialog-content>
            <mat-dialog-actions>
              <!--
              To close the dialog box, we can use the mat-dialog-close directive, as shown below.
              We can also bind a value to mat-dialog-close using property binding, a value that would be transferred to the component that
              opened the dialog box. It doesn't have to be a boolean, it can be any data.
              -->
              <!--
              These buttons send data of either true or false to the component that opens this dialog box.
              -->
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {
  /* For the dialog box component to receive the data, we have to inject an object into the component. To do this we use the @Inject()
  decorator, as shown below and we can name the object anything we like (in our case we named it passedData). We pass into the @Inject()
  decorator the constant which holds the id that allows us to access the data that we passed from the component from where we open this
  dialog box.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
