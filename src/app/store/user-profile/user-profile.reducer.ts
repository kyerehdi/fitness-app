import { createReducer, on } from '@ngrx/store';
import { Person } from 'src/fitness-app-sdk/package/models/person';
import * as userProfileActions from './user-profile.actions';

export interface UserProfileStateI {
  person: Person | null;
  totalExercises: number | null;
  calorieIntake: number | null;
  profilePictureSrc: string | null;
}

export const UserProfileState: UserProfileStateI = {
  person: null,
  totalExercises: null,
  calorieIntake: null,
  profilePictureSrc: null,
};

export const UserProfileReducer = createReducer(
  UserProfileState,

  on(userProfileActions.UpdatePersonSuccess, (state, action) => {
    return {
      ...state,
      person: action.person,
    };
  }),

  on(userProfileActions.FetchPersonSuccess, (state, action) => {
    return {
      ...state,
      person: action.person,
    };
  }),
  on(userProfileActions.FecthPersonProfilePictureSuccess, (state, action) => {
    console.log(action.profilePictureSrc);
    return {
      ...state,
      profilePictureSrc: action.profilePictureSrc,
    };
  }),

  on(userProfileActions.UpdateUserProfilePictureSuccess, (state, action) => {
    console.log('link', action.link);
    return {
      ...state,
      profilePictureSrc: action.link,
    };
  })
);
