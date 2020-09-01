import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { CreateCourseComponent } from './Components/Course/create-course/create-course.component';
import { SearchCourseResultsComponent } from './Components/search-course-results/search-course-results.component';
import { CourseDetailsComponent } from './Components/course-details/course-details.component';
import { HomeComponent } from './Components/home/home.component';
import { CoursesComponent } from './Components/Course/courses/courses.component';
import { UpdateCourseComponent } from './Components/Course/update-course/update-course.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { StudentCoursesComponent } from './Components/Student/student-courses/student-courses.component';
import { AllCoursesInCategoryComponent } from './Components/Student/all-courses-in-category/all-courses-in-category.component';
import { CourseInfoComponent } from './Components/Student/course-info/course-info.component';
import { ExamComponent } from './Components/exam/exam.component';
import { MaterialComponent } from './Components/Course/material/material.component';
import { TakeExamComponent } from './Components/Student/take-exam/take-exam.component';
import{AuthGuard} from 'src/app/auth.guard';



const routes: Routes = [
  { path:'home',component:HomeComponent},
  { path:'signin' , component:SignInComponent },
  { path:'signup' , component:SignUpComponent },
  { path:'profile' , component:ProfileComponent ,canActivate:[AuthGuard]},
  
  {path : 'createcourse' , component : CreateCourseComponent,canActivate:[AuthGuard]},
  {path:'UpdateCourse/:CourseId',component:UpdateCourseComponent,canActivate:[AuthGuard]},
  {path :'courses' , component :CoursesComponent,canActivate:[AuthGuard] },
  { path:'courses/:StgID/:Sem/:Subject',component:SearchCourseResultsComponent,canActivate:[AuthGuard]},
  { path:'coursedetails/:CourseId' , component:CourseDetailsComponent ,canActivate:[AuthGuard]},
  { path: 'courseinfo/:CourseId', component:CourseInfoComponent,canActivate:[AuthGuard]},
  { path: 'exam/:CourseId' , component:ExamComponent,canActivate:[AuthGuard]},
   {path :'Material/lesson/:lessonID' , component :MaterialComponent,canActivate:[AuthGuard] }, // ,canActivate:[AuthGuard]},
   {path :'takeexam/:courseId' , component :TakeExamComponent ,canActivate:[AuthGuard]},


  
 
  { path :'studentcoures' , component :StudentCoursesComponent },
  { path: 'allcourse/:courseCode/:stageId', component:AllCoursesInCategoryComponent},
  { path:'',redirectTo:'/home',pathMatch:'full'},

  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
