import { Action, createAction, props } from '@ngrx/store';
import { UserStateI, newUser } from './new-user.reducer';
import { newPerson } from './new-user.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { FileData } from 'src/fitness-app-sdk/package/models/fileData';
import { User } from 'src/fitness-app-sdk/package/models/users';

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
  props<{
    age: number;
    fullName: string;
    phoneNumber: string;
    profilePicture?: FileData | null;
  }>()
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

export const SubmitPersonSuccess = createAction(
  'Person has been submited',
  props<{
    user: {
      email: string;
      password: string;
    };
  }>()
);

export const SubmitPersonFail = createAction(
  'Person submission has failed',
  props<{ httpExpetion: any }>()
);

export const authenticate = createAction(
  'Authenticate User',
  props<{
    user: {
      email: string;
      password: string;
    };
  }>()
);

export const authenticationSuccess = createAction(
  'Login Success',
  props<{ userId: number }>()
);

export const fetchPersonId = createAction(
  'Fetch Person ID',
  props<{ userId: number }>
);

export const authenticationFailure = createAction(
  'Login Failure',
  props<{ err: any }>()
);

export const refreshAuthentication = createAction('Refreshing authentiation');

export const RestoreState = createAction(
  'Restore The State',
  props<{ state: UserStateI }>()
);

export const getPersonIdSuccess = createAction(
  'Person Id has been succesfully retrieved',
  props<{ personId: number }>()
);

export const getPersonIdFailure = createAction(
  'Person Id has not been retrieved'
);

export const getPersonProfilePictureSuccess = createAction(
  'Person profilePicture has been fetched succesfully',
  props<{ profilePictureSrc: string }>()
);

export const getPersonProfilePictureFailure = createAction(
  'Person ProfilePicuter has not been succefully captured',
  props<{ error: any }>()
);

export const getDaysWorkedOutSuccess = createAction(
  'Fetching Days worked out this week',
  props<{ workoutNumber: number }>()
);

export const getDaysWorkedOutFailure = createAction(
  'Fetching Days worked out this week has not been succefully captured',
  props<{ error: any }>()
);
