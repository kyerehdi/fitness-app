import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPage } from './sign-up/sign-up.page';
import { FirstOnboardingPage } from './oboarding-page-components/onboarding-one/onboarding.one.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
