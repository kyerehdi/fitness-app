import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { UserWorkoutStateI } from '../store/user-workouts/user-workouts.reducer';
import { State, Store } from '@ngrx/store';
import * as userWorkoutSelector from '../store/user-workouts/user-workouts.selectors';
import { AuthetnicatedUserService } from '../services/authenticated-user/authenticated-user.service';
import { GetWorkOutsFromDate } from '../store/user-workouts/user-workouts.actions';
import { UserWorkout } from 'src/fitness-app-sdk/package/models/user-workouts';

@Component({
  selector: 'workout-tacker',
  templateUrl: 'workout-tracker.html',
  styleUrls: ['workout-tracker.scss'],
})
export class WorkoutTracker implements OnInit {
  dateControl = new FormControl();

  date = new Date().toLocaleDateString();

  currentMonth = new Date().getMonth() + 1;

  currentYear = new Date().getFullYear();

  getCurrentWorkouts$ = this.store$.select(userWorkoutSelector.getUserWorkouts);

  personId: number | null = null;

  currentWorkouts: Array<UserWorkout> = [];

  filterdWorkouts: Array<UserWorkout> = [];

  constructor(
    private store$: Store<State<UserWorkoutStateI>>,
    private userService: AuthetnicatedUserService
  ) {}

  ngOnInit(): void {
    this.dateControl.valueChanges
      .pipe(
        map((value) => {
          this.date = new Date(value).toLocaleDateString();
          this.filterWorkouts();
        })
      )
      .subscribe();

    this.userService.getPersonId().then((personId) => {
      this.store$.dispatch(
        GetWorkOutsFromDate({
          year: new Date().getFullYear(),
          month: this.currentMonth,
          personId: Number(personId),
        })
      );
    });

    this.getCurrentWorkouts$
      .pipe(
        map((workouts) => {
          this.currentWorkouts = workouts;
          this.filterWorkouts();
        })
      )
      .subscribe();
  }

  async getDate(event: any) {
    this.dateControl.setValue(event.detail.value);
    const unformattedDate = new Date(event.detail.value);
    const unformattedDateMonth = unformattedDate.getMonth() + 1;
    const unformattedDateyear = unformattedDate.getFullYear();
    const personId = await this.userService.getPersonId();
    if (
      unformattedDateMonth !== this.currentMonth ||
      unformattedDateyear !== this.currentYear
    ) {
      this.currentMonth = unformattedDateMonth;
      this.store$.dispatch(
        GetWorkOutsFromDate({
          year: unformattedDateyear,
          month: unformattedDateMonth,
          personId: Number(personId),
        })
      );
    } else {
      this.date = new Date(event.detail.value).toLocaleDateString();
    }
    this.currentYear = unformattedDateyear;
  }

  filterWorkouts() {
    const targetDate = new Date(this.date);
    this.filterdWorkouts = [
      ...this.currentWorkouts.filter((workout) => {
        const workoutDate = new Date(workout.date);

        return (
          workoutDate.getDate() === targetDate.getDate() &&
          workoutDate.getMonth() === targetDate.getMonth() &&
          workoutDate.getFullYear() === targetDate.getFullYear()
        );
      }),
    ];
  }
}
