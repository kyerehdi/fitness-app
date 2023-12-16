import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateI } from './new-user.reducer';

export const newUserState = createFeatureSelector<UserStateI>('newUserReducer');

export const getUser = createSelector(
  newUserState,
  (state: UserStateI) => state.user
);

export const getPerson = createSelector(
  newUserState,
  (state: UserStateI) => state?.person
);
