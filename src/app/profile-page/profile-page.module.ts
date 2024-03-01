import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile-page';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileReducer } from '../store/user-profile/user-profile.reducer';
import { UserProfileEffect } from '../store/user-profile/user-profile.effects';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  providers: [],
  declarations: [ProfilePage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UserProfileReducer', UserProfileReducer),
    EffectsModule.forFeature([UserProfileEffect]),
  ],
})
export class ProfilePageModule {}
