import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChapter } from 'src/Interfaces/ichapter';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {


  ChapterInfo:IChapter={CourseCode:"",Description:"",CourseId :0 , Name:"",ID:null};

  //ChapterInfo:Subject<IChapter>=new Subject<IChapter>();



  constructor(private httpClient: HttpClient) { }
  


  private messageSource=new BehaviorSubject('');
  
  currentMessage=this.messageSource.asObservable();

  changeChapter(Message:string)
  {
      this.messageSource.next(Message);
    //alert("in change Cart "+this.messageSource.value);
  }






  createChapter(chapter: IChapter) {
    return this.httpClient.post(`${environment.ApiURl}/Chapters`,chapter);
  }
  GetChaptersByCourseCode(CourseCode:number):Observable<IChapter[]>
  {
    return this.httpClient.get<IChapter[]>(`${environment.ApiURl}/Chapters/GetChaptersByCourseCode/${CourseCode}`);
  }
  

  GetChapterByID(ChapterID:number):any
  {
    return this.httpClient.get(`${environment.ApiURl}/Chapter/${ChapterID}`);
  }

  DeleteChapterByID(ChapterID:number):any
  {
    return this.httpClient.delete(`${environment.ApiURl}/Chapters/${ChapterID}`);
  }

  EditChapter(chapter:IChapter):any
  {
    return this.httpClient.put(`${environment.ApiURl}/Chapters/${chapter.ID}`,chapter);
  }

}
