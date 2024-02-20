import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Subject, map, take, takeUntil } from 'rxjs';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import {
  getIsLoggedIn,
  getPersonId,
} from 'src/app/store/users/new-user.selectors';
import { SecureStorage } from '../secureStorage/secure-storage';
import { Person } from 'src/fitness-app-sdk/package/models/person';

@Injectable({
  providedIn: 'root',
})
export class AuthetnicatedUserService implements OnDestroy {
  getIsUserLoggedIn$ = this.store$.select(getIsLoggedIn);

  getPerson$ = this.store$.select(getPersonId);

  private readonly destroyed$ = new Subject<void>();

  isUserLoggedIn: boolean = false;

  personId!: number | null;

  constructor(
    private store$: Store<State<UserStateI>>,
    private secureStoreage: SecureStorage
  ) {
    this.getIsUserLoggedIn$
      .pipe(
        takeUntil(this.destroyed$),
        map((value) => {
          this.isUserLoggedIn = value;
        })
      )
      .subscribe();

    this.getPerson$
      .pipe(
        takeUntil(this.destroyed$),
        map((personId) => {
          this.personId = personId;
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

  async getPersonId(): Promise<number | null> {
    const personString = await this.secureStoreage.getValue('person');

    const person = JSON.parse(personString);

    if (person?.id !== null || person?.id !== undefined) {
      return person.id;
    }
    return this.personId;
  }
}
