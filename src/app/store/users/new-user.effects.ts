import { Injectable } from '@angular/core';
import * as newUserAction from './new-user.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserStateI } from './new-user.reducer';
import { State, Store } from '@ngrx/store';
import { getPerson, getUser, newUserState } from './new-user.selectors';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { PersonService } from 'src/fitness-app-sdk/package/services/person-service/person-service';
import cloneDeep from 'lodash.clonedeep';
import { AlertController } from '@ionic/angular';
import { User } from 'src/fitness-app-sdk/package/models/users';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secureStorage/secure-storage';
import * as moment from 'moment';
import { UserWorkoutService } from 'src/fitness-app-sdk/package/services/user-workout-service/user-workout-service';
import { WorkoutNumber } from 'src/fitness-app-sdk/package/services/user-workout-service/user-workout-service';
import { UpdateUserProfilePictureSuccess } from '../user-profile/user-profile.actions';
import { LogoutService } from 'src/app/services/logout-service/logout-service';

@Injectable()
export class NewUserEffects {
  SubmitUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUserAction.SetUserProfile),
      withLatestFrom(this.store$.select(newUserState)),
      switchMap(([_, state]) => {
        return this.userService.createUser(state.user).pipe(
          map((user) => newUserAction.SumbitUserSuccesss({ user: user })),
          catchError((err) =>
            of(newUserAction.SubmitUserFail({ httpExpetion: err }))
          )
        );
      })
    )
  );

  SubmitUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUserAction.SumbitUserSuccesss),
      withLatestFrom(this.store$.select(newUserState)),
      switchMap(([action, state]) => {
        const person = cloneDeep(state.person);
        person.email = action.user.email;
        person.userID = action.user.id;
        person.profilePictureFileName = person.email + person.userID;
        return this.personService.createPerson(person).pipe(
          switchMap(() => {
            if (state.profilePictureFile) {
              return this.personService
                .uploadProfilePicture(
                  state.profilePictureFile,
                  person.profilePictureFileName
                )
                .pipe(
                  map(() =>
                    newUserAction.SubmitPersonSuccess({
                      user: {
                        email: state.user!.email,
                        password: state.user!.password,
                      },
                    })
                  )
                );
            } else {
              return of(
                newUserAction.SubmitPersonSuccess({
                  user: {
                    email: state.user!.email,
                    password: state.user!.password,
                  },
                })
              );
            }
          }),
          catchError((err) =>
            of(newUserAction.SubmitPersonFail({ httpExpetion: err }))
          )
        );
      })
    )
  );

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUserAction.SubmitPersonSuccess, newUserAction.authenticate),
      withLatestFrom(this.store$.select(newUserState)),
      switchMap(([action, state]) => {
        if (action.user) {
          const user = new User();
          user.email = action.user.email;
          user.password = action.user.password;
          return this.userService.authenticate(user).pipe(
            switchMap((token) => {
              localStorage.setItem('token', token);
              this.router.navigate(['user-home']);
              this.secureStorage.setValue('user', JSON.stringify(user));

              return this.userService
                .getUserId(String(user.email), token.token)
                .pipe(
                  map((userId) => {
                    return newUserAction.authenticationSuccess({ userId });
                  }),
                  catchError((err) => {
                    return of(newUserAction.authenticationFailure(err));
                  })
                );
            }),
            catchError((err) => {
              return of(newUserAction.authenticationFailure({ err }));
            })
          );
        }
        return of(
          newUserAction.authenticationFailure({
            err: {
              message: 'No user submitted.',
            },
          })
        );
      })
    )
  );

  getPersonId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newUserAction.authenticationSuccess),
      withLatestFrom(this.store$.select(newUserState)),
      switchMap(([action, state]) => {
        return this.personService.getPersonFromUserId(action.userId).pipe(
          map((person) => {
            this.secureStorage.setValue('person', JSON.stringify(person));
            return newUserAction.getPersonIdSuccess({ personId: person.id });
          })
        );
      })
    );
  });

  getPersonProfilePictureSrc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newUserAction.authenticationSuccess),
      withLatestFrom(this.store$.select(newUserState)),
      switchMap(([_, state]) => {
        if (state?.userId) {
          return this.personService.getPersonProfilePicture(state.userId).pipe(
            map((profilePictureSrc) =>
              newUserAction.getPersonProfilePictureSuccess({
                profilePictureSrc:
                  profilePictureSrc.format + profilePictureSrc.base64String,
              })
            )
          );
        } else {
          return of(
            newUserAction.getPersonProfilePictureFailure({
              error: {
                message: "Could not fetch User's Profile picture",
              },
            })
          );
        }
      })
    );
  });

  refreshAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUserAction.refreshAuthentication),
      switchMap(() =>
        from(this.secureStorage.getValue('user')).pipe(
          map((value) => {
            const newUser = JSON.parse(value) as {
              email: string;
              password: string;
            };

            return newUserAction.authenticate({
              user: newUser,
            });
          }),
          catchError((error) => {
            console.error('Error retrieving user from secure storage', error);
            return of({ type: 'ERROR', error: error });
          })
        )
      )
    )
  );

  getDaysWorkedOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newUserAction.getPersonIdSuccess),
      switchMap((action) => {
        const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
        return this.userWorkoutService
          .getTotalUserWorkoutsFromDate(startOfWeek, endOfWeek, action.personId)
          .pipe(
            map((workoutNumber: WorkoutNumber) => {
              return newUserAction.getDaysWorkedOutSuccess({
                workoutNumber: workoutNumber.numberOfDaysWorkedOutThisWeek,
              });
            })
          );
      })
    );
  });

  rehydrateProfilePicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateUserProfilePictureSuccess),
      map((action) => {
        return newUserAction.rehydatePersonProfilePicture({ str: action.link });
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newUserAction.logOut),
      switchMap(() => {
        return of(this.logoutService.logout()).pipe(
          map(() => newUserAction.logOutSuccess())
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store$: Store<State<UserStateI>>,
    private userService: UserService,
    private personService: PersonService,
    private router: Router,
    private secureStorage: SecureStorage,
    private userWorkoutService: UserWorkoutService,
    private logoutService: LogoutService
  ) {}
}
