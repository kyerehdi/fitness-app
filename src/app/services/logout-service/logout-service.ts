import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateFn } from '@angular/router';
import { AuthetnicatedUserService } from '../authenticated-user/authenticated-user.service';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { Store, State } from '@ngrx/store';
import { SecureStorage } from '../secureStorage/secure-storage';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private store$: Store<State<UserStateI>>,
    private secureStoreage: SecureStorage
  ) {}

  async logout() {
    await this.secureStoreage.removeValues();
    localStorage.clear();
    
  }
}
