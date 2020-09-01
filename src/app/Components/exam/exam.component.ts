import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MCQ } from 'src/Interfaces/mcq';
import { QuestionService } from 'src/Services/question.service';
import { ToastrService } from 'ngx-toastr';
import { TrueFalse } from 'src/Interfaces/true-false';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  isExpand: boolean;

  elem: any;
  mcq: MCQ;
  ch1: string;
  ch2: string;
  ch3: string;
  ch4: string;
  ch5: string;
  ch6: string;

  ch11: boolean;
  ch12: boolean;
  ch13: boolean;
  ch14: boolean;
  ch15: boolean;
  ch16: boolean;

  ChoiseQues: FormGroup;
  TFQ: TrueFalse;
  TFQues: FormGroup;
  courseId : number
IsSelected:boolean;
  option: number;
  constructor(
    private FB: FormBuilder,
    private QuestionSer: QuestionService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.isExpand = false;
    this.option = 2;
this.IsSelected=false;
    this.TFQ = {
      QuestionID: 0,
      Question: { ID: 0, QuestionContent: 'T or F' },
      CorrectAnswer: true,
    };

    this.mcq = {
      QuestionID: 0,
      Question: {
        ID: 0,
        QuestionContent: '',
      },
      Choices: [
        { choice: '', IsTrue: false },
        { choice: '', IsTrue: false },
        { choice: '', IsTrue: false },
        { choice: '', IsTrue: false },
        { choice: '', IsTrue: false },
        { choice: '', IsTrue: false },
      ],
    };

    this.courseId = this._ActivatedRoute.snapshot.params['CourseId'];

    this.ch1 = '';
    this.ch2 = '';
    this.ch3 = '';

    this.ch4 = '';
    this.ch5 = '';
    this.ch6 = '';

    
    this.ch11 = false;
    this.ch12 = false;
    this.ch13 = false;

    this.ch14 = false;
    this.ch15 = false;
    this.ch16 = false;
  }

  ngOnInit(): void {
    this.ChoiseQues = this.FB.group({
      QuestionContent: ['', [Validators.required]],
      Choices: ['', [Validators.required]],
      ch1: ['', [Validators.required]],
      ch2: ['', [Validators.required]],
      ch3: ['', [Validators.required]],
      ch4: ['', [Validators.required]],
      ch5: ['', [Validators.required]],
      ch6: ['', [Validators.required]],


      ch11: ['', [Validators.required]],
      ch12: ['', [Validators.required]],
      ch13: ['', [Validators.required]],
      ch14: ['', [Validators.required]],
      ch15: ['', [Validators.required]],
      ch16: ['', [Validators.required]],
    });

    this.TFQues = this.FB.group({
      TFQuestionContent: ['', [Validators.required]],
      CorrectAnswer: ['', [Validators.required]],
    });
  }

  AddTFQuestion() {
    document.getElementById('TF').style.display = 'block';
     document.getElementById("TF").style.backgroundColor = " #f4f4f4";
    document.getElementById("TF").style.margin = "20px";
    document.getElementById("TF").style.padding = "20px";

  }

  addTFQ(){
    this.QuestionSer.AddTFQ(this.TFQ , this.courseId).subscribe(
      (data: any) => {
        console.log(data)
       
      },
      (err) => console.log(err)
    );
  }


  toggle() {
    this.isExpand = !this.isExpand;
  }

  AddNewQuestion() {
    document.getElementById('MC').style.display = 'block';
    document.getElementById('MC').style.backgroundColor = ' #f4f4f4';
    document.getElementById('MC').style.margin = '20px';
    document.getElementById('MC').style.padding = '20px';

    // var iDiv = document.createElement('div');

    document.getElementById('MC').classList.add('MCQuestions');

    /*this.elem = document.querySelector('#MC')
    this.elem.classList.add("MCQuestions");*/

    /*  this.elem.innerHTML = this.elem.innerHTML;

    $("p:first").addClass("intro");*/

    let newQuestion = document.getElementById('unique');

    /* document.getElementById('questions').innerHTML =
      document.getElementById('questions').innerHTML +
      newQuestion.innerHTML;*/

    /* document.getElementById('questions').appendChild( newQuestion); */

    /*var node = document.createElement("div");  

   var textnode = document.createElement(newQuestion.innerHTML);   
         // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  /* document.getElementById("myList").appendChild(node);   

    newQuestion.id = "11";

    document.getElementById('questions').appendChild( node);*/

    //console.log(document.getElementById('MC').getElementsByTagName('input')[0].value)
    //console.log(document.getElementById("11 : input").);

    //console.log(newQuestion.id)
  }

  showOption() {}

  addnewoption() {
    this.option++;
    document.getElementById('option' + this.option).style.display = 'flex';
  }
  addChoiseQ() {
    let i = 0;
    while (this.mcq.Choices[i].choice != '') {
      console.log(i);
      i++;
    }

    console.log(this.mcq);

    this.QuestionSer.createQuestion(this.mcq , this.courseId).subscribe(
      (res) => {
        console.log(res);
        this.showSuccess();
      },
      (err) => console.log(err)
    );

    
    // this.mcq.Choices[0]=this.ch1;
    // this.mcq.Choices[1]=this.ch2;
    // this.mcq.Choices[2]=this.ch3;
    // this.mcq.Choices[3]=this.ch4;
    // this.mcq.Choices[4]=this.ch5;
    // this.mcq.Choices[5]=this.ch6;

    //   this.courseSer.createCourse(this.course,this.courseImage).subscribe(
    //     (data: any) => {
    //       alert(data)
    //       this._Router.navigate(["/courses"]);
    //     },
    //     (err) => console.log(err)
    //   );
  }

  showSuccess() {
    this.toastr.success('Question Added Succefully', 'Toastr fun!');
  }

  Hide(){this.IsSelected=true}
  Show(){
    this.IsSelected=false;
    this.mcq.Choices=  [
      { choice: '', IsTrue: false },
      { choice: '', IsTrue: false },
      { choice: '', IsTrue: false },
      { choice: '', IsTrue: false },
      { choice: '', IsTrue: false },
      { choice: '', IsTrue: false },
    ]
  }
}
