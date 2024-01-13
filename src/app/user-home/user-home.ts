import { Component, OnInit } from '@angular/core';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { WorkoutService } from 'src/fitness-app-sdk/package/services/workout-service/workout-service';
@Component({
  selector: 'app-user-home',
  templateUrl: 'user-home.html',
  styleUrls: ['user-home.scss'],
})
export class UserHomePage implements OnInit {
  workoutFile!: WorkoutFile;

  constructor(private workoutService: WorkoutService) {}
  ngOnInit(): void {
    this.workoutService
      .getWorkout()
      .subscribe((workoutFile) => (this.workoutFile = workoutFile));
  }

  getSrc(): string {
    if (this.workoutFile?.gif) {
      return this.workoutFile.gif;
    } else {
      return '';
    }
  }
}
