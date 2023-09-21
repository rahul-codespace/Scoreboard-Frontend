import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { ScoreboardService } from '../_services/scoreboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  isAdminLogin = false;
  adminLoginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private scoreboardService: ScoreboardService,
    private router: Router
  ) {
    this.createloginForm();

  }

  ngOnInit(): void {
    this.isAdminLogin = this.authenticationService.isAdminLogin;
  }

  createloginForm() {
    this.adminLoginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const data = this.adminLoginForm.value;
    console.log(data);

    if (data.username.toLowerCase() == 'admin' && data.password.toLowerCase() == 'password') {
      this.authenticationService.isAdminLogin = true;
      this.router.navigateByUrl('/scoreboard');
    }
  }

  logout() {
    this.authenticationService.isAdminLogin = false;
  }
}
