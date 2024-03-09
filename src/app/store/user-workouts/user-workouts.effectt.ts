import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UserWorkoutStateI } from './user-workouts.reducer';
import { State, Store } from '@ngrx/store';
import * as userWorkoutActions from './user-workouts.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserWorkoutService } from 'src/fitness-app-sdk/package/services/user-workout-service/user-workout-service';

@Injectable()
export class UserWorkouts {
  GetWorkOutsFromDate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userWorkoutActions.GetWorkOutsFromDate),
      switchMap((action) => {
        return this.userWorkoutService
          .getWorkoutFromDate(action.year, action.month, action.personId)
          .pipe(
            map((userWorkouts) => {
              console.log('userWorkouts', userWorkouts);

              return userWorkoutActions.GetWorkOutsFromDateSuccess({
                workouts: userWorkouts,
              });
            }),
            catchError((error) => {
              return of(
                userWorkoutActions.GetWorkOutsFromDateFailure({ error })
              );
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store$: Store<State<UserWorkoutStateI>>,
    private userWorkoutService: UserWorkoutService
  ) {}
}
