import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutTracker } from './workout-tracker';
import { IgxCalendarModule } from 'igniteui-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { WorkoutChipModule } from '../components/workout-chips/workout.chips.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserWorkoutReducer } from '../store/user-workouts/user-workouts.reducer';
import { UserWorkouts } from '../store/user-workouts/user-workouts.effectt';

const routes: Routes = [
  {
    path: '',
    component: WorkoutTracker,
  },
];

@NgModule({
  providers: [provideNativeDateAdapter()],
  declarations: [WorkoutTracker],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UserWorkoutReducer', UserWorkoutReducer),
    EffectsModule.forFeature([UserWorkouts]),
    IgxCalendarModule,
    MatDatepickerModule,
    WorkoutChipModule,
    MatCardModule,
  ],
})
export class WorkoutTrackerModule {}
