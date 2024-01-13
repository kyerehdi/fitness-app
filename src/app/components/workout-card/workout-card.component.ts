import { Component, Input } from '@angular/core';

@Component({
  selector: 'workout-card',
  templateUrl: 'workout-card.component.html',
  styleUrls: ['workout-card.component.scss'],
})
export class WorkoutCard {
  @Input()
  src: string;

  constructor() {}

  
}
