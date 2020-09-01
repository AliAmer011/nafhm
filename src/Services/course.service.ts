import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICourse } from 'src/Interfaces/icourse';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { AuthuserService } from 'src/Services/auth.service';
import { Iuser } from 'src/Interfaces/iuser';
import { CourseTeacher } from 'src/Interfaces/course-teacher';
import { IChapter } from 'src/Interfaces/ichapter';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient,private userService : AuthuserService) {}

  createCourse(course: ICourse,CourseImage:File):Observable<ICourse>{
    const Coursefd = new FormData();
    Coursefd.append('Code',course.Code);
    Coursefd.append('Name',course.Name);
    Coursefd.append('Description',course.Description);
    Coursefd.append('MaxDegree',course.MaxDegree.toString());
    Coursefd.append('MinDegree',course.MinDegree.toString());
    Coursefd.append('StageID',course.StageID.toString());
    Coursefd.append('Semester',course.Semester.toString());
    Coursefd.append("Image",CourseImage);
    
    let s: Iuser=JSON.parse(localStorage.getItem('user'));

    Coursefd.append("TeacherID",s.Id);
    //Coursefd.append("TeacherID",this.userService.userInfo.Id);




    return this.httpClient.post<ICourse>(`${environment.ApiURl}/Courses`,Coursefd);
  }
  searchCourse(StgID : number,Sem : number, Subject : string){
    return this.httpClient.get(`${environment.ApiURl}/Courses/${StgID}/${Sem}/${Subject}`);
  }

  GetAllCourses():Observable<ICourse[]>
  {
    
    // if(sessionStorage.getItem('access_token')!=null)
    // {
    //   var httpOptions1 =  new HttpHeaders({ 'Authorization':'Bearer '+sessionStorage.getItem('access_token')});
    
    // } 
    
  
   
     return this.httpClient.get<ICourse[]>(`${environment.ApiURl}/courses`);//,{headers:httpOptions1});
  }

  GetCourseByCode(courseId:number):Observable<ICourse>
  {
   
      // if(sessionStorage.getItem('access_token') !=null)
      // {
      //   var httpOptions1 =  new HttpHeaders({ 'Authorization':'Bearer '+sessionStorage.getItem('access_token')});
      
      // }   
      return this.httpClient.get<ICourse>(`${environment.URL}/GetCourse/${courseId}`)//,{headers:httpOptions1});
      
    
  }


  updateCourse(course:ICourse,CourseImage:File):Observable<ICourse>
{
  // if(sessionStorage.getItem('access_token') !=null)
  //   {
  //     var httpOptions1 =  new HttpHeaders({ 'Authorization':'Bearer '+sessionStorage.getItem('access_token')});
    
  //   }   
  const Coursefd = new FormData();
  Coursefd.append('Code',course.Code);
  Coursefd.append('Name',course.Name);
  Coursefd.append('Description',course.Description);
  Coursefd.append('MaxDegree',course.MaxDegree.toString());
  Coursefd.append('MinDegree',course.MinDegree.toString());
  Coursefd.append('StageID',course.StageID.toString());
  Coursefd.append('Semester',course.Semester.toString());
  Coursefd.append("Image",CourseImage);

  return this.httpClient.put<ICourse>(`${environment.ApiURl}/Courses`,Coursefd)//,{headers:httpOptions1})

}


DeleteCourse(CourseId:number)
{
  // if(sessionStorage.getItem('access_token') !=null)
  //   {
  //     var httpOptions1 =  new HttpHeaders({ 'Authorization':'Bearer '+sessionStorage.getItem('access_token')});
    
  //   } 
  return this.httpClient.delete<ICourse>(`${environment.ApiURl}/Courses/${CourseId}`);//,{headers:httpOptions1})

}

GetCoursesByUserID(userID:string):Observable<ICourse[]>
{
  return this.httpClient.get<ICourse[]>(`${environment.ApiURl}/Courses/GetCoursesByUserID/${userID}`)//,{headers:httpOptions1});

}

GetCoursesByCodeAndStage(code:string , stage:string){
  return this.httpClient.get<CourseTeacher[]>(`${environment.URL}/AllCourses/${code}/${stage}`) 
}

getAllChapter(courseId:number){
  return this.httpClient.get<IChapter>(`${environment.ApiURl}/Chapters/${courseId}`) 
}

getCourseDetails(courseId:number){
  return this.httpClient.get(`${environment.URL}/CourseDatails/${courseId}`) 
  
  
}
}
