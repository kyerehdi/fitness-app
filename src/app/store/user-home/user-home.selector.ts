import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserHomeState, UserHomeStateI } from './user-home.reducer';

export const userHomeState =
  createFeatureSelector<UserHomeStateI>('userHomeReducer');

export const getPopularWorkouts = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.popularWorkouts
);

export const getQuickWorkouts = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.quickWorkouts
);

export const getSearchString = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.searchString
);

export const getCategory = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.category
);

export const getLoading = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.loading
);

export const searchedWorkouts = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.searchedWorkouts
);

export const isSearching = createSelector(
  userHomeState,
  (state: UserHomeStateI) => state?.isSearching
);
