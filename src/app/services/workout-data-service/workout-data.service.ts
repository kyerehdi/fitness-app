import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  private workoutFile: WorkoutFile = new WorkoutFile();

  private workoutSearchString: string = '';

  constructor(private location: Location) {
    // this.location.onUrlChange(() => {
    //   // this.workoutFile = null;
    //   this.workoutSearchString = '';
    // });
  }

  storeWorkoutData(newWorkoutFile: WorkoutFile) {
    this.workoutFile = newWorkoutFile;
  }

  getWorkoutFile() {
    return this.workoutFile;
  }

  setWorkoutString(workout: string) {
    this.workoutSearchString = workout;
  }

  getWorkoutSearchString() {
    return this.workoutSearchString;
  }
}
