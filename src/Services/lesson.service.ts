import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILesson } from 'src/Interfaces/ilesson';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private httpClient: HttpClient) { }
  createLesson(lesson: ILesson) {
    return this.httpClient.post(`${environment.ApiURl}/Lessons`,lesson);
  }

  GetLessonsByChapter(ChapterID:number):Observable<ILesson[]> {
    return this.httpClient.get<ILesson[]>(`${environment.ApiURl}/Lessons/GetLessonsByChapter/${ChapterID}`);
  }

  DeleteLessonByID(LessonID:number):any
  {
    return this.httpClient.delete(`${environment.ApiURl}/Lessons/${LessonID}`);
  }

  EditLesson(lesson:ILesson):any
  {
    return this.httpClient.put(`${environment.ApiURl}/Lessons/${lesson.ID}`,lesson);
  }


}
