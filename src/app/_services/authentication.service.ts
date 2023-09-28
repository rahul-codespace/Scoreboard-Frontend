import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAdminLogin!: boolean;

  constructor(private http: HttpService) {
    console.log('auth');
  }

  signup(formData: any) {
    const apiUrl = 'api/Auth/register-student';
    return this.http.post(apiUrl, formData);
  }

  login(formData: any) {
    const apiUrl = 'api/Auth/login';
    return this.http.post(apiUrl, formData);
  }

  logout() {
    const data =''
    const apiUrl = 'api/Auth/logout';
    return this.http.post(apiUrl, data);
  }


}
