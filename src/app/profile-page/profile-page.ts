import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthetnicatedUserService } from '../services/authenticated-user/authenticated-user.service';
import { UserProfileStateI } from '../store/user-profile/user-profile.reducer';
import { State, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as userProfileActions from '../store/user-profile/user-profile.actions';
import {
  getPerson,
  getPersonProfilePicture,
} from '../store/user-profile/user-profile.selector';
import { Person } from 'src/fitness-app-sdk/package/models/person';
import { FileData } from 'src/fitness-app-sdk/package/models/fileData';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile-page.html',
  styleUrls: ['profile-page.scss'],
})
export class ProfilePage implements OnInit {
  getUserProfilePicture$ = this.store$.select(getPersonProfilePicture);

  getPerson$ = this.store$.select(getPerson);

  userProfilePicture = false;
  profilePic: SafeUrl;

  isEditing: boolean = false;

  constructor(
    private authenticatedUserService: AuthetnicatedUserService,
    private store$: Store<State<UserProfileStateI>>,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userProfileActions.FetchPerson());
    // this.getUserProfilePicture$
    //   .pipe(
    //     map((profilePicture) => {
    //       console.log('this is profilePicture', profilePicture);
    //       // this.profilePic = profilePicture;
    //       this.userProfilePicture = true;
    //     })
    //   )
    //   .subscribe();
    // console.log('this is store', this.store$);
  }

  editClick() {
    this.isEditing = true;

    console.log(' button worked');
  }

  close($event: any) {
    this.isEditing = false;
  }

  handlePhotoSubmission(data: { photo: FileData; fileName: string }) {
    this.store$.dispatch(
      userProfileActions.UpdateUserProfilePicture({
        profilePicture: data.photo,
        filename: data.fileName,
      })
    );

    this.profilePic = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + data.photo.base64String
    );
  }

  handlePersonSubmission(person: Person) {
    this.store$.dispatch(userProfileActions.UpdatePerson({ person }));
    this.isEditing = false;
  }
}
