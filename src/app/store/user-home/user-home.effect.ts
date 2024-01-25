import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as userHomeActions from './user-home.action';
import { WorkoutService } from 'src/fitness-app-sdk/package/services/workout-service/workout-service';
import { UserHomeStateI } from './user-home.reducer';
import { State, Store } from '@ngrx/store';

@Injectable()
export class UserHomeEffect {
  fetchPopularWorkouts = createEffect(() => {
    return this.actions$.pipe(
      ofType(userHomeActions.FetchPopularWorkouts),
      switchMap(() => {
        return this.workoutService.fetchPopularWorkouts().pipe(
          map((workouts) => {
            this.store$.dispatch(userHomeActions.FetchQuickWorkouts());
            return userHomeActions.FetchPopularWorkoutsSuccess({ workouts });
          }),
          catchError((error) =>
            of(userHomeActions.FetchPopularWorkoutFailure({ error }))
          )
        );
      })
    );
  });

  fetchQuickWokouts = createEffect(() => {
    return this.actions$.pipe(
      ofType(userHomeActions.FetchQuickWorkouts),
      switchMap(() => {
        return this.workoutService.fetchQuickWorkouts().pipe(
          map((workouts) =>
            userHomeActions.FetchQuickWorkoutsSuccess({ workouts })
          ),
          catchError((error) =>
            of(userHomeActions.FetchQuickWorkoutsFailure({ error }))
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private workoutService: WorkoutService,
    private store$: Store<State<UserHomeStateI>>
  ) {}
}
