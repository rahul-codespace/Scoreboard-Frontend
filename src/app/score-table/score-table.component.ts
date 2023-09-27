import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../_services/scoreboard.service';
import { StudentList } from '../_modal/studentList.dto';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {

  studentList!: StudentList[];
  isAdminLogin: boolean;

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
    this.isAdminLogin = this.authenticationService.isAdminLogin;
  }
}
