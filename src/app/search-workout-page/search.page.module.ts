import { NgModule } from '@angular/core';
import { SearchPage } from './search.page';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WorkoutChipModule } from "../components/workout-chips/workout.chips.module";
import { WorkoutCardModule } from "../components/workout-card/workout-card.component.module";
import { AutoCompleteModule } from "../components/autocomplete/auto-complete.module";

const routes: Routes = [
  {
    path: '',
    component: SearchPage,
  },
];

@NgModule({
    declarations: [SearchPage],
    providers: [],
    imports: [RouterModule.forChild(routes), CommonModule, IonicModule, WorkoutChipModule, WorkoutCardModule, AutoCompleteModule]
})
export class SearchPageModule {}
