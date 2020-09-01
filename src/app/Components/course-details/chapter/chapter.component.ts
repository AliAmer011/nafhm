import { Component, OnInit } from '@angular/core';
import { IChapter } from 'src/Interfaces/ichapter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthuserService } from 'src/Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/Services/course.service';
import { ICourse } from 'src/Interfaces/icourse';
import { ChapterService } from 'src/Services/chapter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  AddChapterForm:boolean;
  EditChapterForm:boolean;
  ChaptersList:IChapter[];
  chapter: IChapter;
  EditedChapter:IChapter;
  CourseCode:string;
  course:ICourse;
  ChapterForm: FormGroup;
  EditedChapterForm: FormGroup;
  constructor(
    private user: AuthuserService,
    private route: Router,
    private FB: FormBuilder,
    private _ActivatedRoute:ActivatedRoute ,
    private _courseSer : CourseService,
    private _chapterSer : ChapterService


  ) {
    this.chapter = {
      ID:0,
      Name: '',
      CourseId : parseInt(this._ActivatedRoute.snapshot.params["CourseId"]),
      Description:'',
      CourseCode:this._ActivatedRoute.snapshot.params["CourseCode"]
    };
    this.EditedChapter = {
      ID:0,
      Name: '',
      CourseId : parseInt(this._ActivatedRoute.snapshot.params["CourseId"]),
      Description:'',
      CourseCode:this._ActivatedRoute.snapshot.params["CourseCode"]
    };
    this.AddChapterForm=false;
    this.EditChapterForm=false;
   }
  
  ngOnInit(): void {
    this.ChapterForm = this.FB.group({
      Name:['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(3)]]
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
     //this.chapter.CourseCode=this.course.Code;

      this.CourseCode = this._ActivatedRoute.snapshot.params["CourseId"]
     this._chapterSer.GetChaptersByCourseCode(parseInt(this.CourseCode)).subscribe(
      res => {
        this.ChaptersList = res,
          console.log(res)
        },
        err => console.log(err)
     );
     
  }

  changeAddChapterForm(){
    if(this.AddChapterForm){
      this.AddChapterForm=false;
    }else{
      this.AddChapterForm=true;
      this.EditChapterForm=false;
    }
  }
  changeEditChapterForm(c){
    this.EditedChapter=c;
    if(this.EditChapterForm){
      this.EditChapterForm=false
    }else{
      this.EditChapterForm=true;
      this.AddChapterForm=false;
    }
  }

  addChapter(Name:string,Description:string) {
    console.log('course Code ' + this._ActivatedRoute.snapshot.params["CourseId"])
    this._chapterSer.createChapter(this.chapter).subscribe
     (
       succ=>{
        this._chapterSer.GetChaptersByCourseCode(parseInt(this._ActivatedRoute.snapshot.params["CourseId"])).subscribe(
          res => {
            this.ChaptersList = res,
              console.log(res)
            },
            err => console.log(err)
         );
       },
       err=>alert(err)
     )
  }

  editChapter(Name:string,Description:string){
    this.EditedChapter.Name=Name;
    this.EditedChapter.Description=Description;
    this._chapterSer.EditChapter(this.EditedChapter).subscribe
     (
       succ=>{
        this._chapterSer.GetChaptersByCourseCode(parseInt(this._ActivatedRoute.snapshot.params["CourseId"])).subscribe(
          res => {
            this.ChaptersList = res,
              console.log(res)
            },
            err => console.log(err)
         );
       },
       err=>alert(err)
     )
  }

  changeChapterID(chapter:IChapter){
    this._chapterSer.ChapterInfo=chapter;
    this._chapterSer.changeChapter(chapter.ID.toString());
    //  this._chapterSer.currentMessage.subscribe(
    //    response=>
    //   { //this.AllProductsCount =response.toString();
    //    });

  }

  deleteChapter(C:IChapter){
    this._chapterSer.DeleteChapterByID(C.ID).subscribe(
      succ=>{
        this._chapterSer.GetChaptersByCourseCode(parseInt(this._ActivatedRoute.snapshot.params["CourseId"])).subscribe(
          res => {
            this.ChaptersList = res,
              console.log(res)
            },
            err => console.log(err)
         );
       },
       err=>alert(err)
    );
  }


  
}

