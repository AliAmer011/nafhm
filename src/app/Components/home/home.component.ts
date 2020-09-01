import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Iuser } from 'src/Interfaces/iuser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit , AfterViewInit {
  constructor(private router:Router) {
 
  }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }


  
  showCourses(courseCode){

    let s: Iuser=JSON.parse(localStorage.getItem('user'));
    console.log('Show Courses')
    console.log(s.Level) 
    console.log(courseCode)
    this.router.navigate([`/allcourse/${courseCode}/${s.Level}`]);



  }
}
