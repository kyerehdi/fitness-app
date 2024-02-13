import { createReducer, on } from '@ngrx/store';
import { UserWorkout } from 'src/fitness-app-sdk/package/models/user-workouts';
import * as userWorkoutActions from './user-workouts.actions';

export interface UserWorkoutStateI {
  userWorkouts: Array<UserWorkout>;
}

export const UserWorkoutState: UserWorkoutStateI = {
  userWorkouts: [],
};

export const UserWorkoutReducer = createReducer(
  UserWorkoutState,
  on(userWorkoutActions.GetWorkOutsFromDateSuccess, (state, action) => {
    return {
      ...state,
      userWorkouts: action.workouts,
    };
  })
);
