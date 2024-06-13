import { Routes } from '@angular/router';
import { LatexRendererComponent } from './latex-renderer/latex-renderer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';



export const routes: Routes = [
  { path: '', component: LatexRendererComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: '**', redirectTo: '' }
  ];

  