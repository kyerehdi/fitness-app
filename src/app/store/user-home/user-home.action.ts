import { Action, createAction, props } from '@ngrx/store';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';

export const FetchPopularWorkouts = createAction('Fetch Popular Workouts');

export const FetchPopularWorkoutsSuccess = createAction(
  'Fetch Popular Workout Success',
  props<{ workouts: Array<WorkoutFile> }>()
);

export const FetchPopularWorkoutFailure = createAction(
  'Fetch Popular workout failure',
  props<{ error: any }>()
);

export const FetchQuickWorkouts = createAction('Fetch Quick Workouts');

export const FetchQuickWorkoutsSuccess = createAction(
  'Fetch Quick Workouts success',
  props<{ workouts: Array<WorkoutFile> }>()
);

export const FetchQuickWorkoutsFailure = createAction(
  'Fetch Quick Workouts failure',
  props<{ error: any }>()
);
