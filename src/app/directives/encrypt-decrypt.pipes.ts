import { Pipe, PipeTransform} from '@angular/core';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
 

@Pipe({
    name: 'encrypt'
})  
export class Encrypt implements PipeTransform {
  
    transform(value: any, ...args: any[]) {
        const salt = crypto.randomBytes(16);
        const iterations = 10000;
        const keyLength = 64;
        const digest = 'sha256';


        // CryptoJS.PBKDF2()

    }

}
