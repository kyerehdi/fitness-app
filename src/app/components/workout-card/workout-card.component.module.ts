import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutCard } from './workout-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [WorkoutCard],
  exports: [WorkoutCard],
})
export class WorkoutCardModule {

    constructor() {}


    
}
