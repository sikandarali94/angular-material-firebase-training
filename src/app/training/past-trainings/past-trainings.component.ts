import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  /* The identifiers that we defined for matColumnDef for each column in the template, those identifiers are what we use in displayedColumns
  to show which columns we want to render. This is handy because we can switch the order of the columns by switching the identifiers in
  displayedColumns.
   */
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  /* For our table data source we have to instantiate it with the MatTableDataSource() constructor provided by Angular Material, as shown
  below. MatTableDataSource is a generic type where we provide the type of data we are passing in. In our case we are providing the Exercise
  data into MatTableDataSource. We would think that we need to provide an array of Exercise (Exercise[]), however, MatTableDataSource
  expects that the data we are providing will be array of that data. Therefore we don't need to explicitly state: Exercise[], rather we
  just provide Exercise. MatTableDataSource will know it should be Exercise[].
   */
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    /* dataSource has a data property to which we provide the data we want populated in the table.
     */
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

}
