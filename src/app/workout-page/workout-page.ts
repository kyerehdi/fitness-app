import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutDataService } from '../services/workout-data-service/workout-data.service';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWorkout } from 'src/fitness-app-sdk/package/models/user-workouts';
import { AuthetnicatedUserService } from '../services/authenticated-user/authenticated-user.service';
import { UserWorkoutService } from 'src/fitness-app-sdk/package/services/user-workout-service/user-workout-service';
import { UserStateI } from '../store/users/new-user.reducer';
import { State, Store } from '@ngrx/store';
import { getPersonId } from '../store/users/new-user.selectors';
import { Subject, map, takeUntil } from 'rxjs';
import { UserWorkoutStateI } from '../store/user-workouts/user-workouts.reducer';
import { GetWorkOutsFromDate } from '../store/user-workouts/user-workouts.actions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-workout-page',
  templateUrl: 'workout-page.html',
  styleUrls: ['workout-page.scss'],
})
export class WorkoutPage implements OnInit, OnDestroy {
  workoutFile: WorkoutFile = new WorkoutFile();
  loading: boolean = true;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  getPersonId$ = this.store$.select(getPersonId);
  personId: number | null;

  workoutForm: FormGroup;
  constructor(
    private workoutDataService: WorkoutDataService,
    private location: Location,
    private formBuilder: FormBuilder,
    private authenticationService: AuthetnicatedUserService,
    private userWorkoutService: UserWorkoutService,
    private store$: Store<State<UserStateI>>,
    private userWorkoutStore$: Store<State<UserWorkoutStateI>>,
    private alertController: AlertController
  ) {}
  ngOnDestroy(): void {

    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  ngOnInit(): void {
   

    this.workoutFile = this.workoutDataService.getWorkoutFile();
    this.workoutForm = this.formBuilder.group({
      weight: [null, Validators.required],
      reps: [null, Validators.required],
      sets: [null, Validators.required],
      intensity: [null, Validators.required],
    });

    this.getPersonId$
      .pipe(
        takeUntil(this.destroyed$),
        map((response) => (this.personId = response))
      )
      .subscribe();
  }

  navigateBack() {
    this.location.back();
  }

  getWorkoutName() {
    this.workoutFile = this.workoutDataService.getWorkoutFile();
    return this.workoutFile.workout.workout_name;
  }

  async addWorkout() {
    const date = new Date();
    const userWorkout = new UserWorkout();
    userWorkout.date = date;
    userWorkout.intensity = this.workoutForm.get('intensity')?.value;
    userWorkout.personid = Number(this.personId);
    userWorkout.reps = this.workoutForm.get('reps')?.value;
    userWorkout.weight = this.workoutForm.get('weight')?.value;
    userWorkout.sets = this.workoutForm.get('sets')?.value;
    userWorkout.workoutid = this.workoutFile.workout.id;
    userWorkout.workout_name = this.workoutFile.workout.workout_name;

    this.userWorkoutService
      .addWorkout(userWorkout)
      .pipe(takeUntil(this.destroyed$))
      .subscribe();

   

    this.userWorkoutStore$.dispatch(
      GetWorkOutsFromDate({
        year: new Date().getFullYear(),
        month: date.getMonth() + 1,
        personId: userWorkout.personid,
      })
    );
    this.workoutForm.reset();

    await this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Workout Submitted',
      message: 'Your workout has been submitted.',
      buttons: ['Close'],
    });

    await alert.present();
  }
}
