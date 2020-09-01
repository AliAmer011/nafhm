import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/Interfaces/icourse';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/Services/course.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-search-course-results',
  templateUrl: './search-course-results.component.html',
  styleUrls: ['./search-course-results.component.css']
})
export class SearchCourseResultsComponent implements OnInit {
  courses: ICourse[];
  StgID:number ;
  Sem:number ;
  Subject:string ;
  constructor(private courseSer : CourseService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.StgID = params['StgID'];
      this.Sem = params['Sem'];
      this.Subject = params['Subject'];
    });
    this.courseSer.searchCourse(this.StgID,this.Sem,this.Subject).subscribe(
      (data: any) => {
        console.log(data);
        this.courses = data;
      },
      (err) => console.log(err)
    );
  }

    
  
}
