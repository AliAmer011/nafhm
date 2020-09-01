import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MCQ } from 'src/Interfaces/mcq';
import { environment } from 'src/environments/environment';
import { TrueFalse } from 'src/Interfaces/true-false';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }
  
  createQuestion(question : MCQ , courseId : number) {
    return this.httpClient.post(`${environment.ApiURl}/MCQs/${courseId}`,question);
  }

  getMCQQuestion(courseId : number):Observable<MCQ[]>{
    return this.httpClient.get<MCQ[]>(`${environment.URL}/MCQInCourse/${courseId}`);
  }

  getTFQuestion(courseId : number):Observable<TrueFalse[]>{
    return this.httpClient.get<TrueFalse[]>(`${environment.URL}/TFQuestion/${courseId}`);
  }

  AddTFQ(TFQ: TrueFalse , courseId : number) {
    return this.httpClient.post(`${environment.ApiURl}/TrueFalseQuestions/${courseId}`,TFQ);
  }

  /*GetLessonsByChapter(ChapterID:number):Observable<ILesson[]> {
    return this.httpClient.get<ILesson[]>(`${environment.ApiURl}/Lessons/GetLessonsByChapter/${ChapterID}`);
  }*/

}
