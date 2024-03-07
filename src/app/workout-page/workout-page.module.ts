import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutPage } from './workout-page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [WorkoutPage],
})
export class WorkoutPageModule {}
