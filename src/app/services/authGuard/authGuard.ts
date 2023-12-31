import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateFn } from '@angular/router';
import { AuthetnicatedUserService } from '../authenticated-user/authenticated-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthetnicatedUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.getIsUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
