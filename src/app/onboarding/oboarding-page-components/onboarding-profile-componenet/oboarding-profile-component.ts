import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { SetUserProfile } from 'src/app/store/users/new-user.actions';
import { UserStateI } from 'src/app/store/users/new-user.reducer';
import { getPerson, getUser } from 'src/app/store/users/new-user.selectors';
import { PhotoServiceService } from 'src/app/services/photo-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PersonService } from 'src/fitness-app-sdk/package/services/person-service/person-service';
import { FileData } from 'src/fitness-app-sdk/package/models/fileData';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'onboarding-profile-component',
  templateUrl: 'onboarding-profile-component.html',
  styleUrls: ['./onboarding-profile-component.scss'],
})
export class OnboardingProfileComponent implements OnInit {
  formGroup: FormGroup;
  personInfo$ = this.store$.select(getPerson);
  userInfo$ = this.store$.select(getUser);

  userProfilePicture: SafeResourceUrl;

  pictureBase64: any;

  profilePicture: FileData;

  @Input()
  person: any;

  @Output()
  continueToNextPage = new EventEmitter<number>();

  constructor(
    private _sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private photoService: PhotoServiceService,
    private personService: PersonService,
    private store$: Store<State<UserStateI>>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fullName: [this.person.fullName, Validators.required],
      age: [
        this.person.age === 0 ? null : this.person.age,
        Validators.required,
      ],
      phoneNumber: [this.person.phoneNumber, Validators.required],
    });
  }

  handleFormSubmission() {
    const age: number = this.formGroup.get('age')?.value;
    const fullName: string = this.formGroup.get('fullName')?.value;
    const phoneNumber: string = this.formGroup.get('phoneNumber')?.value;

    this.store$.dispatch(
      SetUserProfile({
        age: age,
        fullName: fullName,
        phoneNumber: phoneNumber,
        profilePicture: (this.profilePicture?.base64String === null || this.profilePicture?.base64String === undefined) ? null : this.profilePicture

      })
    );
    this.continueToNextPage.emit(5);
  
  }

  async addProfilePicture() {
    const capturedPicture = await this.photoService.addNewToGallery();

    this.pictureBase64 = capturedPicture;

    if (capturedPicture) {
      this.userProfilePicture = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + capturedPicture.base64String
      );

        const selectedImage = new FileData();
        selectedImage.base64String = String(capturedPicture.base64String);
        selectedImage.format = String(capturedPicture.format);

        this.profilePicture = cloneDeep(selectedImage);


    }

    
  }
}
