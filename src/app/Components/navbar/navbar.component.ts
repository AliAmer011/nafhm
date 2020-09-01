import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthuserService } from 'src/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Iuser } from 'src/Interfaces/iuser';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IAccount } from 'src/Interfaces/iaccount';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit , OnChanges{
  validatingForm: FormGroup;

  isLoginError: boolean = false;

  isLogin : boolean = false;

  currenUser : IAccount;
  

  constructor(private authSer: AuthuserService, private router: Router) {}

  ngOnChanges() {

    this.isLogin = this.authSer.isLogin; 

    

    this.currenUser = this.authSer.userInfo;

  }

  ngOnInit(): void {

    console.log('Start IsLogin : ' + localStorage.getItem('isLogin'))

    this.currenUser = this.authSer.userInfo;

    this.currenUser = JSON.parse(localStorage.getItem('user'));

    console.log(`in ngOnChanges ${this.currenUser.Image}` )


    if(localStorage.getItem('isLogin') != undefined)
        this.isLogin =  true;
      else
      this.isLogin =  false;


      console.log('isLogin' + this.isLogin)



      //localStorage.removeItem['isLogin'];

      //console.log('isLogin' + localStorage.removeItem['isLogin'])


      //this.image = localStorage.getItem('userImage');



  }

  checkAccount(content, userName, password) {

    this.authSer.login(userName, password).subscribe(
      (data: any) => {
        localStorage.setItem('userToken', data.access_token);

        document.getElementById('close').click();

        this.isLoginError = true;

        localStorage.setItem('isLogin' , 'true');

        console.log('Login :: ' + localStorage.getItem('isLogin'))

        this.isLogin = true;  


        this.authSer.GetUserInfo(userName, password).subscribe(
          (data) => {
            this.authSer.userInfo = data as Iuser;

            this.currenUser = data as Iuser;
            console.log('User Info ' + this.authSer.userInfo)
            localStorage.setItem('userId' , data.Id);
            localStorage.setItem('userImage' , data.Image);
            console.log('User ID : ' +  localStorage.getItem('userId'))
            localStorage.setItem('userType' , data.Type);
            //this.image = data.Image;         

           

            localStorage.setItem('user' , JSON.stringify(data));
            let s: Iuser=JSON.parse(localStorage.getItem('user'));
            console.log(s);

            if(s.Type == "Student")
              this.router.navigate(['/studentcoures']);
              else
              this.router.navigate(['/courses']);
          },
          
          (err) => {
            alert(err);
          }
        );

        
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userImage');
    localStorage.removeItem('isLogin')

    this.isLogin = false;
    this.router.navigate(['/home']);
    
    //this.isAdmin = false;

  }
}
