import { createReducer, on } from '@ngrx/store';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import * as userHomeActions from './user-home.action';

export interface UserHomeStateI {
  quickWorkouts: Array<WorkoutFile>;
  popularWorkouts: Array<WorkoutFile>;
  searchString: string;
  category: string;
  loading: boolean;
}

export const UserHomeState: UserHomeStateI = {
  quickWorkouts: [],
  popularWorkouts: [],
  searchString: '',
  category: '',
  loading: true,
};

export const userHomeReducer = createReducer(
  UserHomeState,

  on(userHomeActions.FetchPopularWorkoutsSuccess, (state, action) => {
    return {
      ...state,
      popularWorkouts: action.workouts,
    };
  }),
  on(userHomeActions.FetchQuickWorkoutsSuccess, (state, actions) => {
    return {
      ...state,
      quickWorkouts: actions.workouts,
      loading: false,
    };
  })
);
