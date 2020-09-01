import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentCoures } from 'src/Interfaces/student-coures';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  
   info : StudentCoures;  

  constructor(private httpClient: HttpClient) { }

  stuent_exam(courseId: number , studentId: string , degree : number){

    this.info = {CouresId : courseId , StudentId : studentId ,Degree : degree };
     return this.httpClient.post(`${environment.ApiURl}/Exam`, this.info );
  }
}
