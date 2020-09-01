import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseComponent } from './Components/Course/create-course/create-course.component';
import { SearchCourseResultsComponent } from './Components/search-course-results/search-course-results.component';
import { CourseDetailsComponent } from './Components/course-details/course-details.component';
import { ChapterComponent } from './Components/course-details/chapter/chapter.component';
import { LessonComponent } from './Components/course-details/lesson/lesson.component';
import { TeachersCourseComponent } from './Components/Course/teachers-course/teachers-course.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { CoursesComponent } from './Components/Course/courses/courses.component';
import { UpdateCourseComponent } from './Components/Course/update-course/update-course.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { StudentCoursesComponent } from './Components/Student/student-courses/student-courses.component';
import { AllCoursesInCategoryComponent } from './Components/Student/all-courses-in-category/all-courses-in-category.component';
import { CourseInfoComponent } from './Components/Student/course-info/course-info.component';
import { ExamComponent } from './Components/exam/exam.component';
import { MaterialComponent } from './Components/Course/material/material.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TakeExamComponent } from './Components/Student/take-exam/take-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    CreateCourseComponent,
    SearchCourseResultsComponent,
    CourseDetailsComponent,
    ChapterComponent,
    LessonComponent,
    TeachersCourseComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    UpdateCourseComponent,
    ProfileComponent,
    StudentCoursesComponent,
    AllCoursesInCategoryComponent,
    CourseInfoComponent,
    ExamComponent,
    MaterialComponent,
    TakeExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
