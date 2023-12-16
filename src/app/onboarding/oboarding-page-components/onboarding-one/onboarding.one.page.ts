import { Component, EventEmitter, Output } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SetGender } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';


@Component({
  selector: 'onboarding-page-one',
  templateUrl: 'onboarding.one.html',
  styleUrls: ['onboarding.one.page.scss'],
})
export class FirstOnboardingPage {
  chosenOption: 'male' | 'female' | 'N/A' = 'N/A';

  @Output()
  continueToNextPage = new EventEmitter<number>();

  constructor(private store$: Store<State<UserStateI>>) {}

  handleGenderChosen(gender: string) {
    this.store$.dispatch(SetGender({ gender: gender }));
    console.log(gender);
  }

  handleCountineButtonClicked() {
    this.continueToNextPage.emit(2);
  }
}
