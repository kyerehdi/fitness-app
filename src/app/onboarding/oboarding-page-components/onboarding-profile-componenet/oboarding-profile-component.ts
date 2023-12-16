import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { SetUserProfile } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { getPerson, getUser } from 'src/app/store/users/new-user.selectors';

@Component({
  selector: 'onboarding-profile-component',
  templateUrl: 'onboarding-profile-component.html',
  styleUrls: ['./onboarding-profile-component.scss'],
})
export class OnboardingProfileComponent implements OnInit {
  formGroup: FormGroup;
  personInfo$ = this.store$.select(getPerson);
  userInfo$ = this.store$.select(getUser);

  @Input()
  person: any;

  @Output()
  continueToNextPage = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private store$: Store<State<UserStateI>>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fullName: [this.person.fullName, Validators.required],
      age: [
        this.person.age === 0 ? null : this.person.age,
        Validators.required,
      ],
      phoneNumber: [this.person.phoneNumber, Validators.required],
    });
  }

  handleFormSubmission() {
    const age: number = this.formGroup.get('age')?.value;
    const fullName: string = this.formGroup.get('fullName')?.value;
    const phoneNumber: string = this.formGroup.get('phoneNumber')?.value;

    this.store$.dispatch(
      SetUserProfile({
        age: age,
        fullName: fullName,
        phoneNumber: phoneNumber,
      })
    );
    this.continueToNextPage.emit(5);
  }
}
