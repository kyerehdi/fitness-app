import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutDataService } from '../services/workout-data-service/workout-data.service';
import { WorkoutFile } from 'src/fitness-app-sdk/package/models/workoutFile';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workout-page',
  templateUrl: 'workout-page.html',
  styleUrls: ['workout-page.scss'],
})
export class WorkoutPage implements OnInit, OnDestroy {
  workoutFile: WorkoutFile = new WorkoutFile();
  constructor(
    private workoutDataService: WorkoutDataService,
    private location: Location

  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.workoutFile = this.workoutDataService.getWorkoutFile();
   
  }

  navigateBack() {
    
    this.location.back();
  }
}
