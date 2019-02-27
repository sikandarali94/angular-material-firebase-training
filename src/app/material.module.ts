/* It is better to have a separate module for the Angular Material components we want to use. We then export this module to our app module.
 */
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  /* We also need to provide a date adapter. We can either use MatNativeDateModule which supports US formatted date or MatMomentDateModule
  which supports international date formats (Moment.js is needed as a dependency for this date adapter).
   */
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  /* To unlock the features of an Angular Material table, we import MatTableModule, as shown below.
   */
  /* MatTableModule does not include sorting, pageanation and filtering.
   */
  MatTableModule,
  /* To get sorting on our material table we import MatSortModule.
   */
  MatSortModule,
  /* The paginator for Angular Material has it's own separate module: MatPaginatorModule. We need to import this if we are implementing a
  paginator.
   */
  MatPaginatorModule,
  /* We are using a snackbar from Angular Material to display error messages on the form of the app (it appears at the bottom of the page).
  First, we need to import the MatSnackBarModule before we can implement it in our code.
   */
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
