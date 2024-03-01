import { Component, OnInit } from '@angular/core';
import { AuthetnicatedUserService } from './services/authenticated-user/authenticated-user.service';
import { ActionSheetController } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import {
  authenticationSuccess,
  refreshAuthentication,
} from './store/users/new-user.actions';
import { map } from 'rxjs';
import { UserStateI } from './store/users/new-user.reducer';
import { State, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authetnicatedUserService: AuthetnicatedUserService,
    private actions: Actions,
    private userStore: Store<State<UserStateI>>,
    private routeService: Router
  ) {}
  ngOnInit(): void {
    console.log('app is starting');
    this.actions
      .pipe(
        ofType(authenticationSuccess),
        map(() => {
          this.isLoggedIn = true;
        })
      )
      .subscribe();

    this.userStore.dispatch(refreshAuthentication());
  }

  navigate(url: string) {
    this.routeService.navigate([url]);
  }
}
