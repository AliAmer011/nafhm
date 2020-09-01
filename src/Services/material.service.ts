import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imaterial } from 'src/Interfaces/imaterial';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private httpClient: HttpClient){}

  Creatematerial(material: Imaterial,materialFile:File){
    const materialfd = new FormData();
    materialfd.append('LessonID',material.LessonID.toString());
    materialfd.append("Type",material.Type);
    materialfd.append("Description",material.Description);
    materialfd.append("material",materialFile);
    materialfd.append("DisplayOrder",material.DisplayOrder.toString());
    return this.httpClient.post<Imaterial>(`${environment.ApiURl}/Material`,materialfd,
    {reportProgress:true,observe:"events"}
  );
  }

  GetAllMaterialsByLesson(LessonID:number):Observable<Imaterial[]>
  {
    
    // if(sessionStorage.getItem('access_token')!=null)
    // {
    //   var httpOptions1 =  new HttpHeaders({ 'Authorization':'Bearer '+sessionStorage.getItem('access_token')});
    
    // } 
    
  
   
     return this.httpClient.get<Imaterial[]>(`${environment.ApiURl}/material/GetMaterialsByLesson/${LessonID}`);//,{headers:httpOptions1});
  }

  deleteMaterial(id:number):Observable<Imaterial>
  {
    return this.httpClient.delete<Imaterial>(`${environment.ApiURl}/material/${id}`);//,{headers:httpOptions1});

  }


  GetMaterialUpp(idToUp:number,idToDown:number):Observable<Imaterial>
  {
    return this.httpClient.get<Imaterial>(`${environment.ApiURl}/material/GetMaterialUp/${idToUp}/${idToDown}`);//,{headers:httpOptions1});

  }

  GetMaterialDown(idToDown:number,idToUp:number):Observable<Imaterial>
  {
    return this.httpClient.get<Imaterial>(`${environment.ApiURl}/material/GetMaterialDown/${idToDown}/${idToUp}`);//,{headers:httpOptions1});

  }

}

