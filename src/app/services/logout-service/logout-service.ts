import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateFn } from '@angular/router';
import { AuthetnicatedUserService } from '../authenticated-user/authenticated-user.service';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { Store, State } from '@ngrx/store';
import { SecureStorage } from '../secureStorage/secure-storage';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private store$: Store<State<UserStateI>>,
    private secureStoreage: SecureStorage,
    private navCtrl: NavController,
    private location: Location,
    private router: Router
  ) {}

  async logout() {

    await this.secureStoreage.removeValues();
    localStorage.clear();
    window.location.reload();
  }
}
