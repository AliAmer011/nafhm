import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenParam } from 'src/Interfaces/token-param';
import { IAccount } from 'src/Interfaces/iaccount';
import { Iuser } from 'src/Interfaces/iuser';


@Injectable({
  providedIn: 'root'
})

export class AuthuserService {
  
  userInfo:Iuser;

  isLogin : boolean;



  constructor(private httpClient: HttpClient) { 
    this.isLogin = false;
  }

  loggedIn()
 {
    return !!localStorage.getItem('userToken') ;
 }



  registerUser(user:IAccount,image:File):Observable<IAccount>
  {
    // const httpOptions =  new HttpHeaders({
    //   'Content-Type': 'application/json',
    //    'Accept': ' /'
    //     });
    // return this.httpClient.post(`${environment.ApiURl}/Account`, user, { headers: httpOptions });

    const Formdata = new FormData();
    Formdata.append('Type',user.Type);
    Formdata.append('Name',user.Name);
    Formdata.append('UserName',user.UserName);
    Formdata.append('Email',user.Email);

    Formdata.append('Level',user.Level);
    Formdata.append('Password',user.Password);
    Formdata.append('ConfirmPassword',user.ConfirmPassword);
    Formdata.append('Address',user.Address);
    Formdata.append('PhoneNumber',user.PhoneNumber);
    Formdata.append('Gender',user.Gender);
    
    Formdata.append("Image",image);


    return this.httpClient.post<IAccount>(`${environment.ApiURl}/Account`,Formdata);

    
  }

  

  login(username: string, password: string): Observable<TokenParam> {
    var headerForTokenApi = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    var data = `grant_type=password&username=${username}&password=${password}`;
  
    return this.httpClient.post<TokenParam>(environment.ApiLogin, data, {
      headers: headerForTokenApi,
    });
  }


  getRole():Observable<string>{
    var headerForTokenApi = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${localStorage.getItem('userToken')}`
      
    });
  
    return this.httpClient.get<string>(`${environment.ApiURl}/Role`, {headers: headerForTokenApi})
  }

  GetUserInfo(username:string,password:string):Observable<Iuser>
  {
    return this.httpClient.get<Iuser>(`${environment.ApiURl}/account/GetUserInfo/${username}/${password}`)

  }

  
  
  editProfile(user:Iuser,image:File):Observable<Iuser>
  {
    // const httpOptions =  new HttpHeaders({
    //   'Content-Type': 'application/json',
    //    'Accept': ' /'
    //     });
    // return this.httpClient.post(`${environment.ApiURl}/Account`, user, { headers: httpOptions });

    const Formdata = new FormData();
    Formdata.append('ID',user.Id);

    Formdata.append('Type',user.Type);
    Formdata.append('Name',user.Name);
    Formdata.append('UserName',user.UserName);
    Formdata.append('Email',user.Email);

    Formdata.append('Level',user.Level);
    // Formdata.append('Password',user.Password);
    // Formdata.append('ConfirmPassword',user.ConfirmPassword);
    Formdata.append('Address',user.Address);
    Formdata.append('PhoneNumber',user.PhoneNumber);
    Formdata.append('Gender',user.Gender);
    Formdata.append("Image",image);
    
    // Formdata.append("Image",image);


    return this.httpClient.put<Iuser>(`${environment.URL}/EditProfile`,Formdata);

    
  }


}








