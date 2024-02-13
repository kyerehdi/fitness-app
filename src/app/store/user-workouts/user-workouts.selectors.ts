import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserWorkoutState, UserWorkoutStateI } from './user-workouts.reducer';

export const newUserWorkoutsState =
  createFeatureSelector<UserWorkoutStateI>('UserWorkoutReducer');

export const getUserWorkouts = createSelector(
  newUserWorkoutsState,
  (state: UserWorkoutStateI) => state.userWorkouts
);
