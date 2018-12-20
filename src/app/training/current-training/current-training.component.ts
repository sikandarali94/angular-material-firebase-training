import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor() { }

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
  }

}
