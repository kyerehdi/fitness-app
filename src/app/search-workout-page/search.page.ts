import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserHomeStateI } from '../store/user-home/user-home.reducer';
import { State, Store } from '@ngrx/store';
import * as userHomeActions from '../store/user-home/user-home.action';
import * as userHomeSelectors from '../store/user-home/user-home.selector';
import { WorkoutDataService } from '../services/workout-data-service/workout-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'search-workout',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<boolean>();
  searchString$ = this.store$.select(userHomeSelectors.getSearchString);
  searchedWorkouts$ = this.store$.select(userHomeSelectors.searchedWorkouts);
  constructor(
    private store$: Store<State<UserHomeStateI>>,
    private workoutDataService: WorkoutDataService,
    private routeService: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userHomeActions.SearchWorkout({ searchString: '' }));
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
        map((params) => {
          params['searchString']
            ? this.store$.dispatch(
                userHomeActions.SearchWorkout({
                  searchString: params['searchString'],
                })
              )
            : null;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleInput(event: any) {
    let searchString = event.target.value.trim();
    searchString.length === 0 ? (searchString = null) : null;

    this.store$.dispatch(
      userHomeActions.SearchWorkout({
        searchString: String(event.target.value),
      })
    );
  }

  navToWorkoutPage(workoutFile: WorkoutFile) {
    this.workoutDataService.storeWorkoutData(workoutFile);
    this.routeService.navigate(['workoutPage']);
  }
}
