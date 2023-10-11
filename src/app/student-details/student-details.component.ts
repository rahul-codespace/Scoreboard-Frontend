import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScoreboardService } from '../_services/scoreboard.service';
import { StudentInfo, StudentList } from '../_modal/studentList.dto';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  studentDetails!: StudentList;
  selectedStudentId: any;
  studentInfo: any;

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

    getStudentDetails(index: number) {
      this.scoreboardService.getStudentsList().subscribe(
        (res) => {
          this.studentDetails = res[index];
          console.log("studentDetails", this.studentDetails);
          if (this.studentDetails) {
            this.selectedStudentId = this.studentDetails.id;
            console.log("this.selectedStudentId", this.selectedStudentId);
    
            // Now that selectedStudentId is set, make the second API call
            this.scoreboardService.getStudentDetail(this.selectedStudentId).subscribe(
              (data: StudentInfo) => {
                this.studentInfo = data;
                console.log("this.studentInfo", this.studentInfo);
                
              },
              (error) => {
                console.error('Error:', error);
              }
            );
          }
        }
      );
    }
    

}
