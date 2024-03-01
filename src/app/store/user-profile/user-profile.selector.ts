import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserProfileStateI } from './user-profile.reducer';

export const UserProfileState =
  createFeatureSelector<UserProfileStateI>('UserProfileReducer');

export const getPerson = createSelector(
  UserProfileState,
  (state: UserProfileStateI) => state?.person
);

export const getPersonProfilePicture = createSelector(
  UserProfileState,
  (state: UserProfileStateI) => state?.profilePictureSrc
);
