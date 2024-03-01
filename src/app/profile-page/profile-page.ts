import { Component, OnInit } from '@angular/core';
import { AuthetnicatedUserService } from '../services/authenticated-user/authenticated-user.service';
import { UserProfileStateI } from '../store/user-profile/user-profile.reducer';
import { State, Store } from '@ngrx/store';
import * as userProfileActions from '../store/user-profile/user-profile.actions';
import { getPersonProfilePicture } from '../store/user-profile/user-profile.selector';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile-page.html',
  styleUrls: ['profile-page.scss'],
})
export class ProfilePage implements OnInit {
getUserProfilePicture$ = this.store$.select(getPersonProfilePicture);

  constructor(
    private authenticatedUserService: AuthetnicatedUserService,
    private store$: Store<State<UserProfileStateI>>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userProfileActions.FetchPerson());

    console.log('this is store', this.store$);
  }

  editClick() {
    this.store$.dispatch(userProfileActions.FetchPerson());

    console.log(' button worked');
  }
}
