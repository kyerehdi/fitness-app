import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OnboardingHeightAndWeight } from './oboarding-page-components/onboarding-height-and-weight/onboarding-height-and-weight.page';
import { FirstOnboardingPage } from './oboarding-page-components/onboarding-one/onboarding.one.page';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SignUpPage } from './sign-up/sign-up.page';
import { NgScrollPickerModule } from 'ng-scroll-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScrollPickerModule } from '../components/scroll-picker/scroll-picker.component.module';
import { OnboardingGoalComponent } from './oboarding-page-components/onboarding-goal-component/onboarding-goal-component';
import { StoreModule } from '@ngrx/store';
import { newUserReducer } from '../store/users/new-user.reducer';
import { OnboardingProfileComponent } from './oboarding-page-components/onboarding-profile-componenet/oboarding-profile-component';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { EffectsModule } from '@ngrx/effects';
import { NewUserEffects } from '../store/users/new-user.effects';

@NgModule({
  providers: [UserService],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingRoutingModule,
    NgScrollPickerModule,
    NgSelectModule,
    ScrollPickerModule,
    ReactiveFormsModule,
    StoreModule.forFeature('newUserReducer', newUserReducer),
    EffectsModule.forFeature([NewUserEffects])
  ],
  declarations: [
    SignUpPage,
    FirstOnboardingPage,
    OnboardingHeightAndWeight,
    OnboardingGoalComponent,
    OnboardingProfileComponent,
  ],
})
export class OnboardingModule {}
