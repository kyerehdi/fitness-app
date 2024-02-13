import { NgModule } from '@angular/core';
import { WorkoutChip } from './workout.chips';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule,IonicModule],
  declarations: [WorkoutChip],
  exports: [WorkoutChip],
})
export class WorkoutChipModule {}