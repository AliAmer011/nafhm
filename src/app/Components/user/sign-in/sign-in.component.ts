import { Component, OnInit } from '@angular/core';
import { AuthuserService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService : AuthuserService,private router : Router) { }

  ngOnInit(): void {
  }

  login(userName,password){
    this.userService.login(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
    //  this.router.navigate(['/index']);
     console.log( localStorage.getItem('userToken'));
     this.userService.GetUserInfo(userName,password).subscribe(
      data=>
    {
        this.userService.userInfo=data;
        this.router.navigate(['/courses']) ;
    }
    ,err=>
    {
     alert(err)
 
    }
   );
     
   },
   (err : HttpErrorResponse)=>{
     
   });


   

  
 }

}

