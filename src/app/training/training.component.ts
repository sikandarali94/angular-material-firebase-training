import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.trainingStarted.subscribe(
      (trainingStatus: boolean) => {
        this.ongoingTraining = trainingStatus;
      }
    );
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

}
