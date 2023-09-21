import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAdminLogin!: boolean;

  constructor() {
    console.log('auth');

  }


}
