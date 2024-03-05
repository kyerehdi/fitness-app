import { Action, props, createAction } from '@ngrx/store';
import { FileData } from 'src/fitness-app-sdk/package/models/fileData';
import { Person } from 'src/fitness-app-sdk/package/models/person';

export const FetchPerson = createAction('Fetch Person');

export const FetchPersonSuccess = createAction(
  'Fetch Person Success',
  props<{ person: Person }>()
);

export const FetchPersonFailure = createAction(
  'Fetch Person Failure',
  props<{ error: any }>()
);

export const FetchPersonProfilePicture = createAction(
  'Fetch Person Profile Picture',
  props<{ userId: number }>()
);

export const FecthPersonProfilePictureSuccess = createAction(
  'Fetch Person Profile Picture Success',
  props<{ profilePictureSrc: string }>()
);

export const FetchPersonProfilePictureFailure = createAction(
  'Fetch Person Profile Picture Failure',
  props<{ error: any }>()
);

export const UpdatePerson = createAction(
  'Update Person',
  props<{ person: Person }>()
);

export const UpdatePersonSuccess = createAction(
  'Update Person Success',
  props<{ person: Person }>()
);

export const UpdatePersonFailure = createAction(
  'Failure to create Person',
  props<{ error: any }>()
);

export const UpdateUserProfilePicture = createAction(
  "Update User's Profile Picture",
  props<{ profilePicture: FileData; filename: string }>()
);

export const UpdateUserProfilePictureSuccess = createAction(
  "Update User's Profile Picture Success",
  props<{ link: string }>()
);

export const UpdateUserProfilePictureFailure = createAction(
  'Update Profile Picture failure'
);
