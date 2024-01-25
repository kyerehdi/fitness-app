import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserHomePage } from './user-home';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutCardModule } from '../components/workout-card/workout-card.component.module';
import { StoreModule } from '@ngrx/store';
import { userHomeReducer } from '../store/user-home/user-home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserHomeEffect } from '../store/user-home/user-home.effect';

const routes: Routes = [
  {
    path: '',
    component: UserHomePage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    WorkoutCardModule,
    StoreModule.forFeature('userHomeReducer', userHomeReducer),
    EffectsModule.forFeature([UserHomeEffect]),
  ],
  declarations: [UserHomePage],
})
export class UserHomePageModule {}
