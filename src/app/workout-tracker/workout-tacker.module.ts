import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutTracker } from './workout-tracker';
import { IgxCalendarModule } from 'igniteui-angular';

import {MatDatepickerModule} from '@angular/material/datepicker';


const routes: Routes = [
  {
    path: '',
    component: WorkoutTracker,
  },
];

@NgModule({
  providers: [],
  declarations: [WorkoutTracker],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    RouterModule.forChild(routes),
    IgxCalendarModule,

    MatDatepickerModule

  ],
})
export class WorkoutTrackerModule {}
