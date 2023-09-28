import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services/authentication.service';
import { ScoreboardService } from '../_services/scoreboard.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  isAdminLogin!: Boolean;
  loginForm!: FormGroup;

  constructor(
    // private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private scoreboardService: ScoreboardService,
    private router: Router
  ) {
    this.isAdminLogin = false;
    this.createloginForm();
    this.checkLoginStausOnRoutChange();

  }
  ngOnInit(): void {
    this.getLoginStatus();

  }
  checkLoginStausOnRoutChange() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getLoginStatus();
        }
      });
  }

  getLoginStatus() {
    this.isAdminLogin = this.authenticationService.isAdminLogin;
  }
  createloginForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // open(content: any) {
  //   this.modalService.open(content, { centered: true, size: 'sm' });
  // }

  onLogin() {
    const data = this.loginForm.value;
    if (data.username.toLowerCase() == 'admin' && data.password.toLowerCase() == 'password') {
      this.authenticationService.isAdminLogin= true;
    }
  }

  logout() {
    this.authenticationService.isAdminLogin = false;
    this.router.navigateByUrl('/login');
  }

}
