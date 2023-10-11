import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  constructor(private http: HttpService) { }

  getStudentsList(){
    return this.http.get('api/ScoreboardGetStudentsInfo');
  }

  getStudentDetail(studentId: number){
    const apiUrl = `api/ScoreboardGetStudentsInfoByStream?studentId=${studentId}`;
    return this.http.get(apiUrl);
  }
}
