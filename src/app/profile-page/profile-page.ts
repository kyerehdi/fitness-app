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

  recomendedCalroieIntake: number = 0;

  imagesLoaded: boolean = false

  constructor(
    private authenticatedUserService: AuthetnicatedUserService,
    private store$: Store<State<UserProfileStateI>>,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userProfileActions.FetchPerson());
    this.getPerson$
      .pipe(
        map((person) => {
          if (person) {
            this.recomendedCalroieIntake = this.calculateCalorieIntake(
              person.goal,
              person
            );
          }
        })
      )
      .subscribe();
  }

  editClick() {
    this.isEditing = true;

    
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

  calculateCalorieIntake(goal: string, person: Person) {
    if (goal === 'Get Fitter') {
      if (person.gender === 'male') {
        return (this.recomendedCalroieIntake =
          (10 * person.weight + 6.25 * person.height - 5 * person.age + 5) *
          1.55);
      }
      return (this.recomendedCalroieIntake =
        (10 * person.weight + 6.25 * person.height - 5 * person.age - 161) *
        1.55);
    } else if (goal === 'Gain Muscles') {
      if (person.gender === 'male') {
        return (this.recomendedCalroieIntake =
          (10 * person.weight + 6.25 * person.height - 5 * person.age + 5) *
            1.55 +
          500);
      }
      return (this.recomendedCalroieIntake =
        (10 * person.weight + 6.25 * person.height - 5 * person.age - 161) *
          1.55 +
        500);
    } else {
      if (person.gender === 'male') {
        return (this.recomendedCalroieIntake =
          (10 * person.weight + 6.25 * person.height - 5 * person.age + 5) *
            1.55 -
          500);
      }
      return (this.recomendedCalroieIntake =
        (10 * person.weight + 6.25 * person.height - 5 * person.age - 161) *
          1.55 -
        500);
    }
  }
}
