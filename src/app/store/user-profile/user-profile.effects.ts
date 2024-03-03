import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userProfileActions from './user-profile.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { PersonService } from 'src/fitness-app-sdk/package/services/person-service/person-service';
import { AuthetnicatedUserService } from 'src/app/services/authenticated-user/authenticated-user.service';

@Injectable()
export class UserProfileEffect {
  fetchPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.FetchPerson),
      switchMap(() => {
        return from(this.authenticatedUserService.getUserId()).pipe(
          switchMap((userId) => {
            if (userId) {
              return this.personService.getPersonFromUserId(userId).pipe(
                map((person) => {
                  console.log('effect should hit');
                  return userProfileActions.FetchPersonSuccess({ person });
                })
              );
            } else {
              return of(
                userProfileActions.FetchPersonFailure({
                  error: {
                    message: 'Error Occured',
                  },
                })
              );
            }
          }),
          catchError((error) =>
            of(userProfileActions.FetchPersonFailure({ error }))
          )
        );
      })
    );
  });

  fetchPersonProfilePicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.FetchPersonSuccess),
      switchMap((action) => {
        console.log('effect hit');
        return this.personService
          .getPersonProfilePicture(action.person.userid)
          .pipe(
            map((profilePictureSrc) => {
              console.log(profilePictureSrc);
              return userProfileActions.FecthPersonProfilePictureSuccess({
                profilePictureSrc: profilePictureSrc.link,
              });
            }),
            catchError((error) =>
              of(userProfileActions.FetchPersonProfilePictureFailure({ error }))
            )
          );
      }),
      catchError((error) =>
        of(userProfileActions.FetchPersonProfilePictureFailure({ error }))
      )
    );
  });

  updatePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.UpdatePerson),
      switchMap((action) =>
        this.personService.updatePerson(action.person).pipe(
          map(() => userProfileActions.FetchPerson()),
          catchError((error) =>
            of(userProfileActions.UpdatePersonFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authenticatedUserService: AuthetnicatedUserService,
    private personService: PersonService
  ) {}
}
