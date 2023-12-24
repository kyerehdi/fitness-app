import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PhotoServiceService {
  constructor() {}

  public async addNewToGallery() {
    let src: string;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100,
    })
      .then((newSrc) => newSrc)
      .catch((error) => {
        console.log('this is error', error.message);
      });

    return capturedPhoto;
  }
}
