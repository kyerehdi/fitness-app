import { Action, createAction, props } from '@ngrx/store';
import { UserWorkout } from 'src/fitness-app-sdk/package/models/user-workouts';

export const GetWorkOutsFromDate = createAction(
  'Get Workouts from date',
  props<{ year: number; month: number; personId: number }>()
);

export const GetWorkOutsFromDateSuccess = createAction(
    'Get Workout from date success', 
    props<{workouts: Array<UserWorkout>}>()
)

export const GetWorkOutsFromDateFailure = createAction(
    'Get Workout from date Failure',
    props<{error: any}>()
)
