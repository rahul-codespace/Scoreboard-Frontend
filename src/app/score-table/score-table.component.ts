import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../_services/scoreboard.service';
import { StudentList } from '../_modal/studentList.dto';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {

  studentList!: StudentList[];
  isAdminLogin: boolean;
  roleOfUser!: string;

  constructor(
    private scoreboardService: ScoreboardService,
    private authenticationService: AuthenticationService,
    private router: Router
    ){
    this.isAdminLogin = false;
  }
  ngOnInit(): void {
    this.getLoginStatus();
    this.getStudentList();
  }

  getStudentList(){
    this.scoreboardService.getStudentsList().subscribe(
      (res)=>{
        this.studentList = res;
      }
    )
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
      if(this.roleOfUser.toLocaleLowerCase() == 'student'){
        this.isAdminLogin = false;
      }else if (this.roleOfUser.toLocaleLowerCase() == 'tl' || this.roleOfUser.toLocaleLowerCase() == 'mentor' || this.roleOfUser.toLocaleLowerCase() == 'hr'){
        this.isAdminLogin = true;
      }
    }
  }
}

