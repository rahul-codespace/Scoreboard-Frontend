import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services/authentication.service';
import { ScoreboardService } from '../_services/scoreboard.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { AlertToasterService } from '../alert-toaster-services/alert-toaster.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  isAdminLogin!: Boolean;
  loginForm!: FormGroup;
  roleOfUser!: string;

  constructor(
    // private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private scoreboardService: ScoreboardService,
    private alert: AlertToasterService,
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
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decoded: any = jwt_decode(token);
      this.roleOfUser = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      console.log(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      if (this.roleOfUser.toLocaleLowerCase() == 'student') {
        this.isAdminLogin = false;
      } else if (this.roleOfUser.toLocaleLowerCase() == 'tl' || this.roleOfUser.toLocaleLowerCase() == 'mentor' || this.roleOfUser.toLocaleLowerCase() == 'hr') {
        this.isAdminLogin = true;
      }
    }
  }
  createloginForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  logout() {
    this.authenticationService.logout().subscribe(
      (res) => {
        localStorage.setItem('token','');
        this.alert.success('Logout Successfully', true)
        this.router.navigateByUrl('login');

      }

    );
  }

}
