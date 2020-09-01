import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/Services/course.service';
import { ChapterService } from 'src/Services/chapter.service';
import { LessonService } from 'src/Services/lesson.service';

import { ActivatedRoute } from '@angular/router';
import { CourseTeacher } from 'src/Interfaces/course-teacher';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseId : number;

  courseDatails :any;

  courseInfo : any;

  constructor(private curSer: CourseService,
    private _ActivatedRoute : ActivatedRoute,
    private chaSer: ChapterService,
    public LesSer: LessonService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.courseId = this._ActivatedRoute.snapshot.params['CourseId'];
    console.log('Course Code' + this.courseId)

    this.getCourseDetails();

    this.getAllChapter(this.courseId);
  }

  getCourseDetails(){
    this.curSer.getCourseDetails(this.courseId).subscribe(
      (res) => {this.courseInfo = res;
      console.log(res)},
      (err) => console.log(err))


    }


    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});//.result.then((result) => {
   }

    sort(arr:any){
      return arr.sort((a,b)=>(a.DisplayOrder>b.DisplayOrder) ? 1 : -1);
    }

  getAllChapter(courseId : number){
    this.curSer.getAllChapter(courseId).subscribe(
      (res) => {this.courseDatails = res;
      console.log(res);},
      (err) => console.log(err))
  }

  toggle(index){

    let content = document.getElementById('expanded' + index).textContent;

    if(content == "+")
      document.getElementById('expanded' + index).textContent = "-";
    else
      document.getElementById('expanded' + index).textContent = "+";

    let display = document.getElementById('details' + index).style.display;

      if(display == 'block')
        document.getElementById('details' + index).style.display = 'none';
      else
      document.getElementById('details' + index).style.display = 'block';


  }

}
