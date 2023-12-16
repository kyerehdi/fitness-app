import { Component, EventEmitter, Output } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SetGoal } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';

@Component({
  selector: 'app-onboarding-goal',
  templateUrl: 'onboarding-goal-component.html',
  styleUrls: ['onboarding-goal-component.scss'],
})
export class OnboardingGoalComponent {
  goal: string = '';

  @Output()
  continueToNextPage = new EventEmitter<number>();
  constructor(private store$: Store<State<UserStateI>>) {}

  onFocus(goal: string) {
    this.goal = goal;
  }

  handleOnContinue() {
    this.store$.dispatch(SetGoal({ goal: this.goal }));
    this.continueToNextPage.emit(4);
  }
}
