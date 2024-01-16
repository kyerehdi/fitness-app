import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { WorkoutService } from 'src/fitness-app-sdk/package/services/workout-service/workout-service';
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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService
      .fetchAllWorkouts()
      .pipe(
        takeUntil(this.destroy$),
        map((workoutFiles) => {
          this.workoutFiles = workoutFiles;
          this.loading = false;
        })
      )
      .subscribe();
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
