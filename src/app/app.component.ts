import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'src/Interfaces/iaccount';
import { AuthuserService } from 'src/Services/auth.service';
import { ILesson } from 'src/Interfaces/ilesson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Alemny';

  aa : []

  constructor() {}
  ngOnInit(): void {}
}
