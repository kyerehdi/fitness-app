import { Component, OnInit } from '@angular/core';
import { AuthetnicatedUserService } from './services/authenticated-user/authenticated-user.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import {
  authenticationSuccess,
  logOut,
  refreshAuthentication,
} from './store/users/new-user.actions';
import { map } from 'rxjs';
import { UserStateI } from './store/users/new-user.reducer';
import { State, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authetnicatedUserService: AuthetnicatedUserService,
    private location: Location,
    private actions: Actions,
    private userStore: Store<State<UserStateI>>,
    private navCtrl: NavController
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

   

    this.actions
      .pipe(
        ofType(logOut),
        map(() => {
          this.isLoggedIn = false;
        })
      )
      .subscribe();
  }

  navigate(url: string) {
    this.navCtrl.navigateRoot(url);
  }
}
