import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'workout-card',
  templateUrl: 'workout-card.component.html',
  styleUrls: ['workout-card.component.scss'],
})
export class WorkoutCard {
  @Input()
  src: string = '';

  @Input()
  name: string = "";

  @Input()
  bodyCategory: string =''


  @Output()
  iconClicked = new EventEmitter();

  constructor() {}

  navToWorkout(){
    this.iconClicked.emit();
  }
}
