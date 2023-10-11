import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { ScoreboardService } from '../_services/scoreboard.service';
import { Router } from '@angular/router';
import { AlertToasterService } from '../alert-toaster-services/alert-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  isAdminLogin = false;
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private scoreboardService: ScoreboardService,
    private alert: AlertToasterService,
    private router: Router
  ) {
    this.createloginForm();

  }

  ngOnInit(): void {
    this.isAdminLogin = this.authenticationService.isAdminLogin;
  }

  createloginForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
    const data = {
      email: this.loginForm.get('email')?.value,
      password:  this.loginForm.get('password')?.value,
      "rememberMe": true
    };
    console.log(data);
    this.authenticationService.login(data).subscribe(
      (res)=>{
        localStorage.setItem('token' , res.token);
        this.alert.success('Login Successful',true)
        this.router.navigateByUrl('scoreboard')
        console.log("response", res)
      },
      (error)=>{
        this.alert.error(`Email or Password Incorrect`,true);
      })

    }
    else{
    this.alert.error(' Please Enter valid details', true);
  }

  }

 
}
