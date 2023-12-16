import { Action, createAction, props } from '@ngrx/store';
import { newUser } from './new-user.reducer';

export const SetUser = createAction('Set User', props<{ user: newUser }>());

export const SetGender = createAction(
  'Set Gender',
  props<{ gender: string }>()
);

export const SetWeightAndHeight = createAction(
  'Set Weight and Height',
  props<{ weight: number; height: number }>()
);

export const SetUserProfile = createAction(
  'Set Users Profile',
  props<{ email: string; age: number; fullName: string; phoneNumber: number }>()
);

export const SetGoal = createAction('Set Goals', props<{ goal: string }>());
export const SubmitUser = createAction('Submit User');
