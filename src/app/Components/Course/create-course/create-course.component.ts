import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/Interfaces/icourse';

import { Istage } from 'src/Interfaces/istage';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/Services/course.service';
import { Router } from '@angular/router';
import { AuthuserService } from 'src/Services/auth.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  course: ICourse;
  courseImage:File;
  Stages:Istage[];
  

  CreateCourse: FormGroup;

  constructor(  private courseSer : CourseService
    ,private FB: FormBuilder, private _Router:Router,private userService : AuthuserService) { 
      
  this.Stages=[{id:1,name:'Stage1'},{id:2,name:'Stage2'},{id:3,name:'Stage3'},{id:4,name:'Stage4'},{id:5,name:'Stage5'}
  ,{id:6,name:'Stage6'},{id:7,name:'Stage7'},{id:8,name:'Stage8'}];

    this.course = {
      Id :  0,
      Code:'',
      Name: '',
      Description:'',
      MaxDegree: 0,
      MinDegree: 0,
      StageID : 0,
      Semester : 0,
      Image:''

    };
   
  }
  readURL(event): void 
  {
    if (event.target.files && event.target.files[0])
     {
      this.courseImage= event.target.files[0];
    }
  }

  ngOnInit(): void {
    this.CreateCourse = this.FB.group({
      Code: ['', [Validators.required, Validators.minLength(3)]],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Desc: ['', [Validators.required, Validators.minLength(3)]],
      MaxDegree: ['', [Validators.required]],
      MinDegree: ['', [Validators.required]],
      Semester: ['', [Validators.required]],
      StageID: ['', [Validators.required]],
     
    });
  }

  createCourse() {
    
    this.courseSer.createCourse(this.course,this.courseImage).subscribe(
      (data: any) => {
        alert(data)
        this._Router.navigate(["/courses"]);
      },
      (err) => console.log(err)
    );
  }

}
