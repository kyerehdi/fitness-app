import { Action, createAction, props } from '@ngrx/store';
import { newUser } from './new-user.reducer';
import { newPerson } from './new-user.reducer';
import { HttpErrorResponse } from '@angular/common/http';

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
  props<{ age: number; fullName: string; phoneNumber: string }>()
);

export const SetGoal = createAction('Set Goals', props<{ goal: string }>());
export const SubmitUser = createAction('Submit User');

export const SumbitUserSuccesss = createAction(
  'User has been submited to database succesfully',
  props<{ user: any }>()
);

export const SubmitUserFail = createAction(
  'User has failed to be submited to database',
  props<{ httpExpetion: any }>()
);

export const SubmitPersonSuccess = createAction('Person has been submited');

export const SubmitPersonFail = createAction(
  'Person submission has failed',
  props<{ httpExpetion: any }>()
);

