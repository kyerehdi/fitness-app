import { createReducer, on } from '@ngrx/store';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import * as userHomeActions from './user-home.action';

export interface UserHomeStateI {
  quickWorkouts: Array<WorkoutFile>;
  popularWorkouts: Array<WorkoutFile>;
  searchedWorkouts: Array<WorkoutFile>;
  searchString: string;
  category: string;
  loading: boolean;
  isSearching: boolean;
}

export const UserHomeState: UserHomeStateI = {
  quickWorkouts: [],
  popularWorkouts: [],
  searchedWorkouts: [],
  searchString: ' ',
  category: '',
  loading: true,
  isSearching: false,
};

export const userHomeReducer = createReducer(
  UserHomeState,

  on(userHomeActions.StopSearching, (state, action) => {
    return {
      ...state,
      isSearching: false,
    };
  }),

  on(userHomeActions.SearchWorkout, (state, action) => {
    return {
      ...state,
      isSearching: true,
      searchString: action.searchString,
    };
  }),

  on(userHomeActions.SearchWorkoutSuccess, (state, action) => {
    return {
      ...state,
      searchedWorkouts: action.workouts,
    };
  }),

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
