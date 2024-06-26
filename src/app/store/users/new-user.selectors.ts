import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateI } from './new-user.reducer';

export const newUserState = createFeatureSelector<UserStateI>('newUserReducer');

export const getUser = createSelector(
  newUserState,
  (state: UserStateI) => state?.user
);

export const getPerson = createSelector(
  newUserState,
  (state: UserStateI) => state?.person
);

export const getIsLoggedIn = createSelector(
  newUserState,
  (state: UserStateI) => state?.isLoggedIn
);

export const getPersonId = createSelector(
  newUserState,
  (state: UserStateI) => state?.personId
);

export const getPersonProfilePicture = createSelector(
  newUserState,
  (state: UserStateI) => state?.profilePictureLink
);

export const getDaysWorkedOut = createSelector(
  newUserState,
  (state: UserStateI) => state?.daysWorkoutThisWeek
);
