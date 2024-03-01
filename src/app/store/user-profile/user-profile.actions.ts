import { Action, props, createAction } from '@ngrx/store';
import { Person } from 'src/fitness-app-sdk/package/models/person';

export const FetchPerson = createAction(
  'Fetch Person',
);

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
