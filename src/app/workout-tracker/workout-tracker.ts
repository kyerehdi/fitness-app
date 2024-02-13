import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'workout-tacker',
  templateUrl: 'workout-tracker.html',
  styleUrls: ['workout-tracker.scss'],
})
export class WorkoutTracker implements OnInit {
  dateControl = new FormControl();

  date = new Date().toLocaleDateString();
  constructor() {}

  ngOnInit(): void {
    console.log(this.dateControl);

    this.dateControl.valueChanges
      .pipe(map((value) => (this.date = new Date(value).toLocaleDateString())))
      .subscribe();
  }

  getDate(event: any) {
    this.dateControl.setValue(event.detail.value);
  }
}
