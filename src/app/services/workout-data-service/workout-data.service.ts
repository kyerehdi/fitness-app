import { Injectable } from '@angular/core';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  private workoutFile: WorkoutFile = new WorkoutFile();

  constructor() {}

  storeWorkoutData(newWorkoutFile: WorkoutFile) {
    this.workoutFile = newWorkoutFile;
  }

  getWorkoutFile() {
    return this.workoutFile;
  }
}
