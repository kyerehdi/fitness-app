import { Component, Input } from '@angular/core';

@Component({
  selector: 'workout-chip',
  templateUrl: 'workout.chips.html',
  styleUrls: ['workout.chips.scss'],
})
export class WorkoutChip {
  @Input()
  workoutData!: string;

  @Input()
  workoutTitle!: string;

  constructor() {}
}
