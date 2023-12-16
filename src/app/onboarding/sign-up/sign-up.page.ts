import { Component, OnInit } from '@angular/core';
import { OnboardingConstants } from '../../constants/onboarding-constants/onboarding-constants';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { UserState, UserStateI } from 'src/app/store/users/new-user.reducer';
import { getPerson, getUser } from 'src/app/store/users/new-user.selectors';
import * as CRYPTOJS from 'crypto-js';
import { SetUser, SubmitUser } from 'src/app/store/users/new-user.actions';
import { map } from 'rxjs';

@Component({
  selector: 'sign-up-page',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  pageStatus: string | undefined = OnboardingConstants.SIGN_UP;

  getUser$ = this.store$.select(getUser);

  getPerson$ = this.store$.select(getPerson);

  signUpForm: UntypedFormGroup;

  progressValue = 0;

  index = 0;

  constructor(
    private fb: FormBuilder,
    private store$: Store<State<UserStateI>>
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required],
        reEnterPassword: [null, Validators.required],
      },
      { validators: this.checkPasswordsMatch }
    );
  }

  onSubmit() {
    const salt = CRYPTOJS.lib.WordArray.random(128 / 8).toString();
    const hashsedPassword = CRYPTOJS.PBKDF2('xmen4321', salt, {
      keySize: 128 / 32,
      iterations: 1000,
    }).toString();

    const user = {
      email: this.signUpForm.get('email')?.value,
      password: hashsedPassword,
      salt: salt,
    };
    this.store$.dispatch(SetUser({ user: user }));

    this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_ONE;
  }

  checkPasswordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const reEnterPassword = control.get('reEnterPassword');
    if (
      password &&
      reEnterPassword &&
      password.value !== reEnterPassword.value
    ) {
      return { 'miss matching password': true };
    }
    return null;
  }

  get isSignUpPage(): boolean {
    return this.pageStatus === OnboardingConstants.SIGN_UP;
  }

  get isChoosingGender(): boolean {
    this.progressValue = 0.2;
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_ONE;
  }

  get isChoosingHeightAndWeight(): boolean {
    this.progressValue = 0.4;
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_TWO;
  }

  get isChoosingGoals(): boolean {
    this.progressValue = 0.7;
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_THREE;
  }

  get isProfile(): boolean {
    this.progressValue = 0.9;
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_FOUR;
  }

  handlePageNav(number: number) {
    this.index = number;
    if (number === 2) {
      this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_TWO;
    } else if (number === 3) {
      this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_THREE;
    } else if (number === 4) {
      this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_FOUR;
    } else if (number === 5) {
      this.store$.dispatch(SubmitUser());
    }
  }
}
