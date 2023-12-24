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
import { SetUser } from 'src/app/store/users/new-user.actions';
import { catchError, map } from 'rxjs';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up-page',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  pageStatus: string | undefined = OnboardingConstants.ONBOARDING_STAGE_FOUR;

  getUser$ = this.store$.select(getUser);

  getPerson$ = this.store$.select(getPerson);

  signUpForm: UntypedFormGroup;

  progressValue = 0;

  index = 0;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store$: Store<State<UserStateI>>,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
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
    const user = {
      email: this.signUpForm.get('email')?.value.toLowerCase(),
      password: this.signUpForm.get('password')?.value,
    };
    this.store$.dispatch(SetUser({ user: user }));
    this.userService.checkIfEmailIsNotInDB(user.email).subscribe();

    this.checkIfEmailsIsNotInDB(user.email);
    this.loading = true;
  }

  private checkIfEmailsIsNotInDB(email: string) {
    this.userService
      .checkIfEmailIsNotInDB(email)
      .pipe(
        map(async (value) => {
          if (value === false) {
            const alert = await this.alertController.create({
              header: 'Email all ready used',
              message:
                'Sorry it seems like this email is already used in our system, try a different one.',
              buttons: ['Close'],
            });
            await alert.present();
          } else {
            this.index = this.index + 1;
            this.handlePageNav(this.index);
          }
        }),
        catchError(async (error) => {
          const alert = await this.alertController.create({
            header: 'Error Occured',
            message:
              'Sorry unknown error occured please try later.',
            buttons: ['Close'],
          });
          await alert.present();
        })
      )
      .subscribe(() => (this.loading = false));
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

  goBack() {
    this.index = this.index - 1;
    this.handlePageNav(this.index);
  }

  get isSignUpPage(): boolean {
    return this.pageStatus === OnboardingConstants.SIGN_UP;
  }

  get isChoosingGender(): boolean {
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_ONE;
  }

  get isChoosingHeightAndWeight(): boolean {
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_TWO;
  }

  get isChoosingGoals(): boolean {
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_THREE;
  }

  get isProfile(): boolean {
    return this.pageStatus === OnboardingConstants.ONBOARDING_STAGE_FOUR;
  }

  handlePageNav(number: number) {
    // this.index = number;
    // switch (this.index) {
    //   case 1:
    //     this.progressValue = 0.2;
    //     this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_ONE;
    //     break;

    //   case 2:
    //     this.progressValue = 0.4;
    //     this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_TWO;
    //     break;

    //   case 3:
    //     this.progressValue = 0.7;
    //     this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_THREE;
    //     break;

    //   case 4:
    //     this.progressValue = 0.9;
    //     this.pageStatus = OnboardingConstants.ONBOARDING_STAGE_FOUR;
    //     break;

    //   default:
    //     this.progressValue = 0;
    //     this.pageStatus = OnboardingConstants.SIGN_UP;
    //     break;
    // }
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
