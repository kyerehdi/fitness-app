import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userProfileActions from './user-profile.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PersonService } from 'src/fitness-app-sdk/package/services/person-service/person-service';
import { AuthetnicatedUserService } from 'src/app/services/authenticated-user/authenticated-user.service';
import { UserProfileStateI } from './user-profile.reducer';
import { State, Store, select } from '@ngrx/store';
import { UserProfileState } from './user-profile.selector';

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
        if (action.person !== null) {
          return this.personService
            .getPersonProfilePicture(action.person?.userid)
            .pipe(
              map((profilePictureSrc) => {
                return userProfileActions.FecthPersonProfilePictureSuccess({
                  profilePictureSrc:
                    profilePictureSrc.format + profilePictureSrc.base64String,
                });
              }),
              catchError((error) =>
                of(
                  userProfileActions.FetchPersonProfilePictureFailure({ error })
                )
              )
            );
        } else {
          return of(
            userProfileActions.FetchPersonProfilePictureFailure({
              error: {
                message: 'person does not exist',
              },
            })
          );
        }
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
          map(() =>
            userProfileActions.UpdatePersonSuccess({ person: action.person })
          ),
          catchError((error) =>
            of(userProfileActions.UpdatePersonFailure({ error }))
          )
        )
      )
    );
  });

  // rehydate$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(userProfileActions.UpdatePersonSuccess),
  //       map(() => location.reload())
  //     );
  //   },
  //   { dispatch: false }
  // );

  // updateProfilePicture$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(userProfileActions.UpdateUserProfilePicture),
  //     withLatestFrom(this.store$.select(UserProfileState)),
  //     switchMap(([actions, state]) => {
  //       return this.personService
  //         .uploadProfilePicture(actions.profilePicture, actions.filename)
  //         .pipe(
  //           switchMap(() =>
  //             this.personService
  //               .getPersonProfilePicture(Number(state.person?.userid))
  //               .pipe(
  //                 map((profilePicutre) => {
  //                   console.log(
  //                     'this is effecte getting hit agian',
  //                     profilePicutre
  //                   );
  //                   return userProfileActions.UpdateUserProfilePictureSuccess({
  //                     link: `${profilePicutre}?v=${new Date().getTime()}`,
  //                   });
  //                 })
  //               )
  //           ),
  //           catchError(() =>
  //             of(userProfileActions.UpdateUserProfilePictureFailure())
  //           )
  //         );
  //     })
  //   );
  // });

  updateProfilePicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.UpdateUserProfilePicture),
      withLatestFrom(this.store$.pipe(select(UserProfileState))),
      switchMap(([action, state]) => {
        return this.personService
          .uploadProfilePicture(action.profilePicture, action.filename)
          .pipe(
            map((fileData) => {
              if (state.person !== null) {
                return userProfileActions.UpdateUserProfilePictureSuccess({
                  link: fileData.format + fileData.base64String,
                });
              } else {
                return userProfileActions.FetchPersonFailure({
                  error: { message: 'Fail' },
                });
              }
            }),
            catchError((error) =>
              of(userProfileActions.FetchPersonProfilePictureFailure({ error }))
            )
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authenticatedUserService: AuthetnicatedUserService,
    private personService: PersonService,
    private store$: Store<State<UserProfileStateI>>
  ) {}
}
