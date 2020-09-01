import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/Interfaces/icourse';
import { CourseService } from 'src/Services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  // course:ICourse={Code:"",Description:"",Image:"",
  // MaxDegree:null,MinDegree:null,Name:"",Semester:null,StageID:null};
  // name:string="";
  course:ICourse;
  constructor(
    private _courseSer : CourseService,
    private _ActivatedRoute:ActivatedRoute 

  ) {}

  ngOnInit(): void {
    // alert(this._ActivatedRoute.snapshot.params['CourseCode']);
    // this._courseSer.GetCourseByCode(this._ActivatedRoute.snapshot.params['CourseCode']).subscribe(
    //   arg =>{ this.course = arg
    //   this.name=this.course.Name;
    //   alert(this.name);
    //   },
    //   err=>console.log(err)
      
    //   );
    
  }

}
