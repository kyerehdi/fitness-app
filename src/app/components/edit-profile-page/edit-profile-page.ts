import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { PhotoServiceService } from 'src/app/services/photo-service.service';
import { FileData } from 'src/fitness-app-sdk/package/models/fileData';
import { Person } from 'src/fitness-app-sdk/package/models/person';

@Component({
  selector: 'edit-profile-page',
  templateUrl: 'edit-profile-page.html',
  styleUrls: ['edit-profile-page.scss'],
})
export class EditProfilePage implements OnInit {
  @Input()
  person!: Person;

  @Input()
  orginalProfilePicture!: string | null;

  editForm!: FormGroup;

  pictureBase64: any;

  userProfilePicture: SafeResourceUrl;

  profilePicture: FileData;

  @Output()
  closeComponenent = new EventEmitter<any>();

  @Output()
  submitEdit = new EventEmitter<Person>();

  @Output()
  submitNewPhoto = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private photoService: PhotoServiceService
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      fullName: [this.person.fullname, Validators.required],
      age: [this.person.age, Validators.required],
      phoneNumber: [this.person.number, Validators.required],
      currentWeight: [this.person.weight, Validators.required],
      height: [this.person.height, Validators.required],
      goal: [this.person.goal, Validators.required],
    });
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

  handleOnCloseButtonClicked($event: any) {
    this.closeComponenent.emit($event);
  }

  handleOnSubmit() {
    const newPerson = cloneDeep(this.person);
    newPerson.age = this.editForm.get('age')?.value;
    newPerson.fullname = this.editForm.get('fullName')?.value;
    newPerson.height = this.editForm.get('height')?.value;
    newPerson.number = this.editForm.get('phoneNumber')?.value;
    newPerson.weight = this.editForm.get('currentWeight')?.value;
    newPerson.goal = this.editForm.get('goal')?.value;
    newPerson.profilePictureFileName = newPerson.email + newPerson.userid;

    this.profilePicture
      ? this.submitNewPhoto.emit({
          photo: this.profilePicture,
          fileName: newPerson.profilePictureFileName,
        })
      : null;
    this.submitEdit.emit(newPerson);
  }
}
