import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';

@Component({
  selector: 'auto-complete',
  templateUrl: 'auto-complete.html',
  styleUrls: ['auto-complete.scss'],
})
export class AutoComplete implements OnChanges {
  @Input()
  workouts: Array<WorkoutFile> | any;

  @Output()
  navEmit = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  onClick(event: any) {
    this.navEmit.emit(event);
  }
}
