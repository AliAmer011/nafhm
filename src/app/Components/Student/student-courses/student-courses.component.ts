import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/Interfaces/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  showCourses(courseCode){

    let s: Iuser=JSON.parse(localStorage.getItem('user'));



    console.log('Show Courses')
    console.log(s.Level) 
    console.log(courseCode)


    this.router.navigate([`/allcourse/${courseCode}/${s.Level}`]);



  }

}
