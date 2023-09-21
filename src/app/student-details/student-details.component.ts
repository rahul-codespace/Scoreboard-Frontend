import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScoreboardService } from '../_services/scoreboard.service';
import { StudentList } from '../_modal/studentList.dto';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  studentDetails!: StudentList;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scoreboardService: ScoreboardService
    ) {
      this.activatedRoute.paramMap.subscribe((params) => {
        console.log(params.get('id'));
        const id = Number(params.get('id'))-1;
        this.getStudentDetails(id)
      })
  }

  getStudentDetails(index: number){
    this.scoreboardService.getStudentsList().subscribe(
      (res)=>{
        this.studentDetails = res[index];
      }
    )
  }


}
