import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LoginComponent } from './login/login.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ScoreTableComponent } from './score-table/score-table.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
  },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
