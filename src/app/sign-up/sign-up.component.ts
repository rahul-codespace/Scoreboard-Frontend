import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  constructor(private authService: AuthenticationService, private fb: FormBuilder,) {
    this.signupForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      streamId: [0, Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log("formData", formData);
      
      this.authService.signup(formData).subscribe(
        (response) => {
          console.log('Signup success:', response);
        },
        (error) => {
          console.error('Signup failed:', error);
        }
      );
    }
  }
}
