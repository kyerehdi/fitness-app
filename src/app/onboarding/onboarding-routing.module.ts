import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPage } from './sign-up/sign-up.page';
import { FirstOnboardingPage } from './onboarding-one/onboarding.one.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage,
  },
  {
    path: 'onboarding-one',
    component: FirstOnboardingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
