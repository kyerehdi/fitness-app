import { NgModule } from '@angular/core';
import { ScrollPicker } from './scroll-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ScrollPicker],
  exports: [ScrollPicker],
})
export class ScrollPickerModule {}
