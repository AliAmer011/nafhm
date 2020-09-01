import { Component, OnInit } from '@angular/core';

import { ICourse } from 'src/Interfaces/icourse';

import { Istage } from 'src/Interfaces/istage';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/Services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course: ICourse;
  courseImage:File;
  Stages:Istage[];
  CourseCode: string;

updateCourse: FormGroup;
constructor(private _courseSer : CourseService,private _ActivatedRoute:ActivatedRoute 
  , /* private _Location:Location ,*/private _Router:Router
,private FB: FormBuilder){ 

    this.Stages=[{id:1,name:'Stage1'},{id:2,name:'Stage2'},{id:3,name:'Stage3'},{id:4,name:'Stage4'},{id:5,name:'Stage5'}
  ,{id:6,name:'Stage6'},{id:7,name:'Stage7'},{id:8,name:'Stage8'}];
  // this.course = {
  //   Code:'',
  //   Name: '',
  //   Description:'',
  //   MaxDegree: 0,
  //   MinDegree: 0,
  //   StageID : 0,
  //   Semester : 0,
  //   Image:''

  // };
 
  }

  ngOnInit(): void {
    this.updateCourse = this.FB.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Desc: ['', [Validators.required, Validators.minLength(3)]],
      MaxDegree: ['', [Validators.required]],
      MinDegree: ['', [Validators.required]],
      Semester: ['', [Validators.required]],
      StageID: ['', [Validators.required]],
     
    });
    this.CourseCode = this._ActivatedRoute.snapshot.params["CourseId"];

    this._courseSer.GetCourseByCode(parseInt(this.CourseCode))
    .subscribe(
     res => {
       this.course = res,
         console.log(res)
       },
       err => console.log(err)
      )

    
  }


  readURL(event): void 
  {
   
    
    if (event.target.files && event.target.files[0])
     {
      this.courseImage= event.target.files[0];
      //this.course.Image= this.courseImage.name;
    }
  
  }
  UpdateCourse():void
  {
    
    this._courseSer.updateCourse(this.course,this.courseImage).subscribe(
      (data: any) => {
        alert(data)
        this._Router.navigate(["/courses"]);
      },
      (err) => console.log(err)
    );
  }
}
