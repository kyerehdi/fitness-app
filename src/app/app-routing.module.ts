import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authGuard/authGuard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login-screen/login-screen.module').then((m) => m.LoginModule),
  },

  {
    path: 'user-home',
    loadChildren: () =>
      import('./user-home/user-home.module').then((m) => m.UserHomePageModule),
   
  },
  {
    path: 'workoutPage',
    loadChildren: () =>
      import('./workout-page/workout-page.module').then(
        (m) => m.WorkoutPageModule
      ),

  },
  {
    path: 'workoutTracker',
    loadChildren: () =>
      import('./workout-tracker/workout-tacker.module').then(
        (m) => m.WorkoutTrackerModule
      ),
    
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
