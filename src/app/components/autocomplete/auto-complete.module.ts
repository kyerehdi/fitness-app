import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComplete } from './auto-complete';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AutoComplete],
  exports: [AutoComplete],
})
export class AutoCompleteModule {}
