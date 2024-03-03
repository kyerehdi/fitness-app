import { Component, OnInit } from '@angular/core';
import { AuthetnicatedUserService } from '../services/authenticated-user/authenticated-user.service';
import { UserProfileStateI } from '../store/user-profile/user-profile.reducer';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userProfileActions from '../store/user-profile/user-profile.actions';
import {
  getPerson,
  getPersonProfilePicture,
} from '../store/user-profile/user-profile.selector';
import { Person } from 'src/fitness-app-sdk/package/models/person';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile-page.html',
  styleUrls: ['profile-page.scss'],
})
export class ProfilePage implements OnInit {
  getUserProfilePicture$ = this.store$.select(getPersonProfilePicture);

  getPerson$ = this.store$.select(getPerson);
  isEditing: boolean = false;

  constructor(
    private authenticatedUserService: AuthetnicatedUserService,
    private store$: Store<State<UserProfileStateI>>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userProfileActions.FetchPerson());

    console.log('this is store', this.store$);
  }

  editClick() {
    this.isEditing = true;

    console.log(' button worked');
  }

  close($event: any) {
    this.isEditing = false;
  }

  handlePersonSubmission(person: Person) {
    this.store$.dispatch(userProfileActions.UpdatePerson({ person }));
    this.isEditing = false;
  }
}
