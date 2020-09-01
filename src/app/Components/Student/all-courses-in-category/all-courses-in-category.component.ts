import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/Interfaces/icourse';
import { CourseService } from 'src/Services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseTeacher } from 'src/Interfaces/course-teacher';

@Component({
  selector: 'app-all-courses-in-category',
  templateUrl: './all-courses-in-category.component.html',
  styleUrls: ['./all-courses-in-category.component.css'],
})
export class AllCoursesInCategoryComponent implements OnInit {
  CourseList: CourseTeacher[];

  courseCode: string;

  stageName: string;

  constructor(
    private curSer: CourseService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseCode = this._ActivatedRoute.snapshot.params['courseCode'];
    this.stageName = this._ActivatedRoute.snapshot.params['stageId'];

    this.getAllCourseInStage();
  }

  getAllCourseInStage() {
    this.curSer
      .GetCoursesByCodeAndStage(this.courseCode, this.stageName)
      .subscribe(
        (ok) => {
          this.CourseList = ok;

          console.log('getAllCourseInStage' + this.CourseList)

        },
        (err) => console.log(err)
      );
  }

  searchByTeacherName(teacherName: string) {


    this.curSer
      .GetCoursesByCodeAndStage(this.courseCode, this.stageName)
      .subscribe(
        (ok) => {
          this.CourseList = ok;
          console.log(this.CourseList);
          this.CourseList = this.CourseList.filter(
            (crs) => crs.TeacherName == teacherName
          );
        },
        (err) => console.log(err)
      );

    
  }

  takeExam(courseId:number){
    
  }

  reset(){
    this.getAllCourseInStage();

    
  }
}
