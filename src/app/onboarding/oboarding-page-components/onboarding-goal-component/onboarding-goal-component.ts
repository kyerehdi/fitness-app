import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SetGoal } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';

@Component({
  selector: 'app-onboarding-goal',
  templateUrl: 'onboarding-goal-component.html',
  styleUrls: ['onboarding-goal-component.scss'],
})
export class OnboardingGoalComponent implements AfterViewInit {
  @ViewChild('loseWeight')
  loseWeightDiv: ElementRef;

  @ViewChild('getFitter')
  getFitterDiv: ElementRef;

  @ViewChild('gainMuscle')
  gainMuscleDiv: ElementRef;

  goal: string = '';

  @Input()
  person: any;

  @Output()
  continueToNextPage = new EventEmitter<number>();
  constructor(private store$: Store<State<UserStateI>>) {}


  ngAfterViewInit(): void {
    if(this.person){

      switch(this.person.goal){

        case 'Lose Weight':
          this.loseWeightDiv.nativeElement.focus();
          break;

        case 'Get Fitter':
          this.getFitterDiv.nativeElement.focus();
          break;

        case 'Gain Muscles':
          this.gainMuscleDiv.nativeElement.focus();
          break;

        default:
          break;
      }
    }
  }

  onFocus(goal: string) {
    this.goal = goal;
  }

  handleOnContinue() {
    this.store$.dispatch(SetGoal({ goal: this.goal }));
    this.continueToNextPage.emit(4);
  }
}
