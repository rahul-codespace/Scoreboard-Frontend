import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAdminLogin!: boolean;

  constructor(private http: HttpClient) {
    console.log('auth');
  }

  signup(formData: any) {
    const apiUrl = '/api/Auth/register-student';
    return this.http.post(apiUrl, formData);
  }
}
