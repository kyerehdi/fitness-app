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
        return this.personService.createPerson(person).pipe(
          map(() => newUserAction.SubmitPersonSuccess()),
          catchError((err) =>
            of(newUserAction.SubmitPersonFail({ httpExpetion: err }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<State<UserStateI>>,
    private userService: UserService,
    private personService: PersonService,
  ) {}
}
