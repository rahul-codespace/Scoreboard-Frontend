import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertToasterService } from '../alert-toaster-services/alert-toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private alert: AlertToasterService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      streamId: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const data = {
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        streamId: Number(this.signupForm.get('streamId')?.value)
      }
      console.log("formData", data);

      this.authService.signup(data).subscribe(
        (response) => {
          this.router.navigateByUrl('scoreboard')
          this.alert.success('Student Registered Successful', true)
        },
        (error) => {
          this.alert.error('Signup failed', true);
        }
      );
    }
    else {
      this.alert.error(' Please Enter valid details', true);
    }
  }
}
