import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
/* We must make sure to import MatSort from '@angular/material' before we can use it in our TypeScript file.
 */
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
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
  private exChangedSubscription: Subscription;

  /* We get a reference to our matSort directive on the template using ViewChild and MatSort (which we need to import). We don't get access
  to the entire table that the matSort directive is sitting on but really just the underlying sorting set up Angular Material infers for us.
  We can name 'sort' anything we like.
   */
  @ViewChild(MatSort) sort: MatSort;
  /* We are getting a reference to the paginator using ViewChild and MatPaginator (which we need to import). This is so we can link the
  paginator to our data source.
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    /* dataSource has a data property to which we provide the data we want populated in the table.
     */
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  /* With regards to ViewChild, the template hasn't been rendered yet on the ngOnInit lifecycle hook. That is why we are implementing the
  ngAfterViewInit lifecycle hook.
   */
  ngAfterViewInit() {
    /* We are linking our data source sort property to the table that has the matSort directive implemented on it.
     */
    this.dataSource.sort = this.sort;
    /* Here we are linking the paginator to our data source. Please note that we are implementing this in the ngAfterViewInit lifecycle
    hook.
     */
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    /* Angular Material concatenates the entire values in a row in a single string. That is why the filter value should be trimmed of white
    space. The reason we are lower casing our filter value is because Angular Material lower cases the concatenated string of each row. It
    is within the concatenated string where filter is searching for matches. To change the behaviour of how Angular Material concatenates
    and lower cases we should refer to the Angular Material documentation.
     */
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }

}
