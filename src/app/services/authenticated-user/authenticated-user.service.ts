import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Subject, map, take, takeUntil } from 'rxjs';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { getIsLoggedIn } from 'src/app/store/users/new-user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthetnicatedUserService implements OnDestroy {
  getIsUserLoggedIn$ = this.store$.select(getIsLoggedIn);

  private readonly destroyed$ = new Subject<void>();

  isUserLoggedIn: boolean = false;

  constructor(private store$: Store<State<UserStateI>>) {
    this.getIsUserLoggedIn$
      .pipe(
        takeUntil(this.destroyed$),
        map((value) => {
          this.isUserLoggedIn = value;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}
