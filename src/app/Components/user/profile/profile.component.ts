import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/Interfaces/iaccount';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthuserService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import { Iuser } from 'src/Interfaces/iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
display:boolean;

account: Iuser;
LoginForm: FormGroup;
InstructorImage:File;
  constructor(
    private user: AuthuserService,
    private route: Router,
   private FB: FormBuilder
  ) { 
    this.display=false;


  }

  ngOnInit(): void
   {

    this.account=JSON.parse(localStorage.getItem('user'));
console.log(this.account);

    this.LoginForm = this.FB.group({
      Type:['', [Validators.required]],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Image:['', [Validators.required]],
      Level:['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      // Password: ['', [Validators.required, Validators.minLength(6)]],
      // ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      Gender: ['', [Validators.required]],
    });
  }

  

  Toggle(){
    //  console.log("HI")
    this.display=!this.display;
   }


   readURL(event): void 
   {
    
     
     if (event.target.files && event.target.files[0])
      {
       this.InstructorImage= event.target.files[0];
     }
   
   }

  edit() {
    this.user.editProfile(this.account,this.InstructorImage).subscribe(
      (data: any) => {
        localStorage.setItem('user',JSON.stringify(data))
        this.account=JSON.parse(localStorage.getItem('user'));

        console.log(data);
      },
      (err) => console.log(err)
    );
  }
}
