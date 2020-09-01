import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/Services/question.service';
import { MCQ } from 'src/Interfaces/mcq';
import { TrueFalse } from 'src/Interfaces/true-false';
import { Answer } from 'src/Interfaces/New folder/answer';
import { ExamService } from 'src/Services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/Interfaces/iuser';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit {
  questionMCQCounter: number;
  questionTFCounter: number;
  curMCQQuestion: MCQ;
  curTFQuestion: TrueFalse;

  totalDegree: number;
  isFound: boolean;

  isMcq: boolean;
  isFinish : boolean;
  unchecked :boolean;

  mcq: MCQ[];
  tf: TrueFalse[];

  MCQQuestion: Answer[] = [];
  TFQuestion: Answer[] = [];

  saveAns: boolean;

  courseId : number;
  constructor(private questionSer: QuestionService,
    private exSer:ExamService ,
    private _ActivatedRoute:ActivatedRoute ,) {
    this.totalDegree = 0;
    this.questionMCQCounter = 0;
    this.questionTFCounter = 0;
    this.saveAns = false;
    this.isMcq = true;
    this.isFinish = false;
    this.unchecked = false;

    this.courseId = this._ActivatedRoute.snapshot.params["courseId"];

    console.log("Coures ID : " + this.courseId)

    /*/this.MCQQuestion  = [
      {questionNo : 0 , IsTrue : false },
      {questionNo : 1 , IsTrue : false },
      {questionNo : 2 , IsTrue : false },
      {questionNo : 3 , IsTrue : false },
      {questionNo : 4 , IsTrue : false },
      {questionNo : 5 , IsTrue : false },
      {questionNo : 6 , IsTrue : false },
      {questionNo : 7 , IsTrue : false },
      {questionNo : 8 , IsTrue : false },
      {questionNo : 9 , IsTrue : false },
    ]*/
  }

  ngOnInit(): void {

    this.questionSer.getMCQQuestion(this.courseId).subscribe(
      (res) => {
        console.log('hi')
        this.mcq = res;
        this.curMCQQuestion = this.mcq[this.questionMCQCounter];
      },
      (err) => console.log(err)
    );

    this.questionSer.getTFQuestion(this.courseId).subscribe(
      (res) => {
        this.tf = res;
        this.curTFQuestion = this.tf[this.questionTFCounter];
        
      },
      (err) => console.log(err)
    );
  }

  next(): void {

    this.unchecked = false;
   
    if (this.isMcq) {
      if (this.questionMCQCounter != this.mcq.length-1) {
        ++this.questionMCQCounter;
      }
      else{
        
      this.isMcq = false;      }
    } else {
      
      if (this.questionTFCounter != this.tf.length-1) {
        ++this.questionTFCounter;
      }
      else{

      }
    }
  }

  pre(): void {
    
    console.log("QuestionMCQCounter : " + this.questionMCQCounter);

    if (this.isMcq) {
      if (this.questionMCQCounter != -1) {
        --this.questionMCQCounter;
      }
      else{
      this.isMcq = false;      }
    } else {
      if (this.questionTFCounter != 0) {
        --this.questionTFCounter;
      }
      else{
        this.isMcq = true;
      }
    }
  
  }

  chooseAnsTF(i: number, c: boolean, isTrue: boolean) {
   // alert('is True ' + isTrue);

  

    this.isFound = false;

    if (this.MCQQuestion.length > 0) {
      for (let item of this.TFQuestion) {
        if (item.questionNo == i) {
          if (c == isTrue) item.IsTrue = true;
          else item.IsTrue = false;

          console.log('isTrue : ' + item.IsTrue);
          this.isFound = true;
          break;
        }
      }
    }

    let ans: Answer;

    if (!this.isFound) {
      if (c == isTrue) ans = { questionNo: i, IsTrue: true };
      else ans = { questionNo: i, IsTrue: false };

      this.TFQuestion.push(ans);
    }
  }

  chooseAns(i: number, userAns: boolean) {

    this.isFound = false;

    if (this.MCQQuestion.length > 0) {
      for (let item of this.MCQQuestion) {
        if (item.questionNo == i) {
          item.IsTrue = userAns;
          console.log('isTrue : ' + item.IsTrue);
          this.isFound = true;
          break;
        }
      }
    }

    if (!this.isFound) {
      let ans: Answer;
      ans = { questionNo: i, IsTrue: userAns };

      this.MCQQuestion.push(ans);
    }
  }

  getTotalDegree() {
    /*this.MCQQuestion.forEach((q) => {
    if(q.IsTrue) 
    {
      this.totalDegree += 5; 
    }
  }
    )
    /*}*/

    

    this.isFinish = true;

    this.totalDegree = 0;

    console.log(this.MCQQuestion);

    for (let mcq of this.MCQQuestion) {
      if (mcq.IsTrue == true) {
        this.totalDegree += 5;
      }
    }

    for (let mcq of this.TFQuestion) {
      if (mcq.IsTrue == true) {
        this.totalDegree += 5;
      }
    }

    //alert('You get ' + this.totalDegree);

    this.saveAns = true;

    this.MCQQuestion = [];
    this.TFQuestion = [];

    let s: Iuser=JSON.parse(localStorage.getItem('user'));
            
    this.exSer.stuent_exam(this.courseId , s.Id , this.totalDegree).subscribe(

      (ok)=>console.log(ok),
      (err)=>console.log(err)
    )
  }
}
