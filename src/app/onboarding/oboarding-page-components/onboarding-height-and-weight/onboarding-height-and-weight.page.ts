import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SetWeightAndHeight } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';

@Component({
  selector: 'onboarding-height-and-weight',
  templateUrl: 'onboarding-height-and-weight.html',
  styleUrls: ['onboarding-height-and-weight.page.scss'],
})
export class OnboardingHeightAndWeight implements OnInit {
  selectedValue: any | undefined;

  selectedCar: number | undefined;

  weight: number = 190;

  height: number = 0;

  @Input()
  person: any;

  @Output()
  continueToNextPage = new EventEmitter<number>();

  constructor(private store$: Store<State<UserStateI>>) {}

  ngOnInit() {
    this.person.weight ? (this.weight = this.person.weight) : null;
  }

  heightSelection(event: number) {
    this.height = event;
  }

  get canDismiss(): boolean {
    if (!this.weight) {
      return false;
    } else if (this.weight < 50 || this.weight > 1000) {
      return false;
    } else {
      return true;
    }
  }

  handleContinueClicked() {
    this.store$.dispatch(
      SetWeightAndHeight({ weight: this.weight, height: this.height })
    );
    this.continueToNextPage.emit(3);
  }
}
