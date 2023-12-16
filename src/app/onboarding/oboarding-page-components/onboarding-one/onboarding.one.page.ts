import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SetGender } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { Person } from 'src/fitness-app-sdk/package/models/person';

@Component({
  selector: 'onboarding-page-one',
  templateUrl: 'onboarding.one.html',
  styleUrls: ['onboarding.one.page.scss'],
})
export class FirstOnboardingPage implements AfterViewInit {
  chosenOption: 'male' | 'female' | 'N/A' = 'N/A';

  @ViewChild('femaleDiv')
  femaleDivElement: ElementRef;

  @ViewChild('maleDiv')
  maleDivElement: ElementRef;

  @ViewChild('NADIV')
  noneDivElement: ElementRef;

  @Input()
  person: any;

  @Output()
  continueToNextPage = new EventEmitter<number>();

  constructor(private store$: Store<State<UserStateI>>) {}
  ngAfterViewInit(): void {
    this.focusOnRightDiv();
  }

  handleGenderChosen(gender: string) {
    this.store$.dispatch(SetGender({ gender: gender }));
  }

  handleCountineButtonClicked() {
    this.continueToNextPage.emit(2);
  }

  focusOnRightDiv() {
    const gender = this.person.gender;

    switch (gender) {
      case 'male':
        this.maleDivElement?.nativeElement.focus();
        break;

      case 'female':
        this.femaleDivElement?.nativeElement.focus();
        break;

      case 'N/A':
        this.noneDivElement?.nativeElement.focus();
        break;

      default:
        break;
    }
  }
}
