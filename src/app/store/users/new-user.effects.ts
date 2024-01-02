import { Injectable } from '@angular/core';
import * as newUserAction from './new-user.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserStateI } from './new-user.reducer';
import { State, Store } from '@ngrx/store';
import { getUser, newUserState } from './new-user.selectors';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { PersonService } from 'src/fitness-app-sdk/package/services/person-service/person-service';
import cloneDeep from 'lodash.clonedeep';
import { AlertController } from '@ionic/angular';
import { User } from 'src/fitness-app-sdk/package/models/users';
import { Router } from '@angular/router';

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
            map((token) => {
              localStorage.setItem('token', token);
              this.router.navigate(['user-home']);
              return newUserAction.authenticationSuccess();
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

  constructor(
    private actions$: Actions,
    private store$: Store<State<UserStateI>>,
    private userService: UserService,
    private personService: PersonService,
    private router: Router
  ) {}
}
