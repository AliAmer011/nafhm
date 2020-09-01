import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/Interfaces/iaccount';
import {
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { AuthuserService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import { Iuser } from 'src/Interfaces/iuser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  account: Iuser;
  LoginForm: FormGroup;
  InstructorImage: File;
  constructor(
    private userSer: AuthuserService,
    private router: Router,
    private FB: FormBuilder
  ) {
    this.account = {
      Id: '',
      Type: 'Instructor',
      Name: '',
      UserName: '',
      Image: '',
      Level: 'First',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      PhoneNumber: '',
      Gender: 'Male',
    };
  }
  ngOnInit(): void {
    this.LoginForm = this.FB.group({
      Type: ['', [Validators.required]],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Image: ['', [Validators.required]],
      Level: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      Gender: ['', [Validators.required]],
    });
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      this.InstructorImage = event.target.files[0];
    }
  }

  reg() {

    let image ;

    this.userSer.registerUser(this.account, this.InstructorImage).subscribe(
      (success) => {
        console.log('register successfuly');

        this.userSer
          .login(this.account.UserName, this.account.Password)
          .subscribe(
            (res) => {
              console.log(res);

              localStorage.setItem('userToken', res.access_token);

              localStorage.setItem('isLogin', 'true');

              this.userSer
                .GetUserInfo(this.account.UserName, this.account.Password)
                .subscribe(
                  (res) => {
                    // TODO:
                    // Recieve User data

                    image = (res as Iuser).Image;
                  },
                  (err) => {}
                );
            },
            (err) => console.log(err)
          );

        if (this.account.Type == 'Student') {

          /**/

          this.account.Image = "assets/student-graduate-avatar-icon-vector.jpg";

          this.userSer.userInfo   = this.account;

          localStorage.setItem('user', JSON.stringify(this.account));

          this.router.navigate(['/studentcoures']);

        } else if (this.account.Type == 'Instructor') {

          this.account.Image = image;

          this.userSer.userInfo = this.account;

          this.router.navigate(['/courses']);
        }
      },
      (err) => console.log(err)
    );
  }
}
