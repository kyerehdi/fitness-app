import { Inject, Injectable } from '@angular/core';
import {
  SecureStoragePlugin,
  SecureStoragePluginPlugin,
} from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class SecureStorage {
  constructor() {}

  async setValue(name: string, obj: string) {
    await SecureStoragePlugin.set({
      key: name,
      value: obj,
    });
  }

  async getValue(name: string): Promise<string> {
    return SecureStoragePlugin.get({
      key: name,
    }).then((newValue) => newValue.value);
  }

  async removeValues() {
    SecureStoragePlugin.clear();
  }
}
