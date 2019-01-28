import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingService.startExercise();
  }

}
