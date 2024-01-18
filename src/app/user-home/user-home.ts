import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, finalize, map, switchMap, takeUntil, tap } from 'rxjs';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { WorkoutService } from 'src/fitness-app-sdk/package/services/workout-service/workout-service';
import { UserHomeStateI } from '../store/user-home/user-home.reducer';
import { State, Store } from '@ngrx/store';
import * as userHomeActions from '../store/user-home/user-home.action'
@Component({
  selector: 'app-user-home',
  templateUrl: 'user-home.html',
  styleUrls: ['user-home.scss'],
})
export class UserHomePage implements OnInit, OnDestroy {
  workoutFile!: WorkoutFile;
  loading: boolean = true;
  readonly destroy$ = new Subject<boolean>();
  workoutFiles!: Array<WorkoutFile>;
  quickWorkoutFiles!: Array<WorkoutFile>;

  constructor(private workoutService: WorkoutService, private store$: Store<State<UserHomeStateI>>) {}

  ngOnInit(): void {
    this.store$.dispatch(userHomeActions.FetchPopularWorkouts());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getSrc(): string {
    if (this.workoutFile?.gifUrl) {
      return this.workoutFile.gifUrl;
    } else {
      return '';
    }
  }
}
