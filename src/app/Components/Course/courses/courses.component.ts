import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/Services/course.service';
import { Router } from '@angular/router';
import { ICourse } from 'src/Interfaces/icourse';
import { AuthuserService } from '../../../../Services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  CoursesList: ICourse[];
  CourseCount : number;
  Course: ICourse ;
  courseImage:File;

  editCourse: FormGroup;


  constructor(
    private _CourseService: CourseService,
    private _Router: Router,
    private userService: AuthuserService,
    private modalService :NgbModal ,
    private _courseSer : CourseService,
    private FB: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.editCourse = this.FB.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Desc: ['', [Validators.required, Validators.minLength(3)]],
      MaxDegree: ['', [Validators.required]],
      MinDegree: ['', [Validators.required]],
      Semester: ['', [Validators.required]],
      StageID: ['', [Validators.required]],
     
    });


    console.log(this.userService.userInfo);
    //this._CourseService.GetAllCourses().subscribe(
      this._CourseService.GetCoursesByUserID(localStorage.getItem('userId')).subscribe(
      res=>{
        this.CoursesList=res;
        this.CourseCount=this.CoursesList.length;
      },
      err=>{console.log(err) ;alert(err)}
    )
    }

  

  updateCourse(content, courseCode){

    console.log('Course Code  : ' + courseCode);

    this._courseSer.GetCourseByCode(courseCode)
    .subscribe(
     (res) => {

       console.log("Result : " + res);

       this.Course = res as ICourse,
         console.log('Course : ' + this.Course.Name)

         this.modalService.open(content).result.then((ok)=> {
          let deletedProd = this.CoursesList.find(prod=>prod.Code == courseCode)},
          (cancel)=>console.log(cancel)
  
        );
       },
       err => console.log(err)
      )

      
  }

  DeleteCourse(courseCode) {
    this._CourseService.DeleteCourse(courseCode).subscribe(
      (res) => {
        alert('deleted successfully !');
        this._Router.navigate(['/courses']);
        //alert(res.Id);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  deleteCourse(content, courseId){

    //this._prodServe.getProduct(pid).subscribe((res)=>{

      this.modalService.open(content ).result.
      then((ok)=> {

        let course = this.CoursesList.find(course=>course.Id == courseId)
       
        const index = this.CoursesList.indexOf(course)
  
        this.CoursesList.splice(index,1)

        this._CourseService.DeleteCourse(courseId).subscribe(
          (res) => {
           
            console.log("Delete Successfuly")
            //alert(res.Id);
          },
    
          (err) => {
            console.log(err);
          }
        );


        
      
      },
      (cancel)=>
      {
        console.log(cancel)
      }
      )
    
    }



    /**/
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
    
    this._courseSer.updateCourse(this.Course,this.courseImage).subscribe(
      (data: any) => {
        alert(data)
        this._Router.navigate(["/courses"]);
      },
      (err) => console.log(err)
    );
  }

    
  

  deleteProduct(content, courseCode){

    //this._prodServe.getProduct(pid).subscribe((res)=>{

      this.modalService.open(content ).result.
      then((ok)=> {
        let deletedProd = this.CoursesList.find(prod=>prod.Code == courseCode)
       
        const index = this.CoursesList.indexOf(deletedProd)
  
        this.CoursesList.splice(index,1)

        this._CourseService.DeleteCourse(courseCode).subscribe(
          (res) => {
            alert('deleted successfully !');
            this._Router.navigate(['/courses']);
            //alert(res.Id);
          },
    
          (err) => {
            console.log(err);
          }
        );


        
      
      },
      (cancel)=>
      {
        console.log(cancel)
      }
      )
    
    }
  }
