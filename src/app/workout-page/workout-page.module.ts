import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutPage } from './workout-page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, IonicModule],
  declarations: [WorkoutPage],
})
export class WorkoutPageModule {}