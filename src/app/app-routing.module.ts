import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LoginComponent } from './login/login.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ScoreTableComponent } from './score-table/score-table.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'scoreboard', pathMatch: 'full'
  },
  {
    path: 'scoreboard', component: ScoreboardComponent, children:[
      {
        path: '', component: ScoreTableComponent
      },
      {
        path: ':id', component: StudentDetailsComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
