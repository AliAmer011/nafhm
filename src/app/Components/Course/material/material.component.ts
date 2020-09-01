import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Imaterial } from 'src/Interfaces/imaterial';
import { MaterialService } from 'src/Services/material.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs";
//import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  progress: number;
  material: Imaterial;
  materialFile:File;
  CreatematerialFG: FormGroup;
  LessonID:number;

  materialList: Imaterial[];

  closeResult = '';
  constructor(private _MaterialService:MaterialService,private _ActivatedRoute:ActivatedRoute 
    ,private FB: FormBuilder, private _Router:Router,private modalService: NgbModal) { 
       }

  ngOnInit(): void {
    this.LessonID=this._ActivatedRoute.snapshot.params['lessonID']

      this._MaterialService.GetAllMaterialsByLesson(this.LessonID).subscribe(
        data=>{this.materialList=data},
        err=>console.log(err)
      )
    
      this.CreatematerialFG = this.FB.group({
        material: ['', [Validators.required]],
        Description: ['', [Validators.required]]
      });

      this.material=
      {
        ID:null,
        Name:'',
        LessonID:this.LessonID,
        Type:'',
        Description:'',
        DisplayOrder:0
      }

  }
  readURL(event): void 
  {
   
    
    if (event.target.files && event.target.files[0])
     {
      this.materialFile= event.target.files[0];
      this.material.Type= this.materialFile.type;
    }
  
  }

  Creatematerial()
  {
    this.material.DisplayOrder=this.materialList.length+1;
    
    this._MaterialService.Creatematerial(this.material,this.materialFile).subscribe(
      (event: any) => {
       // alert(data)
        //this._Router.navigate(["/courses"]);
        if (event.type == HttpEventType.UploadProgress)
         {
          this.progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type == HttpEventType.Response) {
          this.progress = null;
         
          this.materialList.push(event.body)
          this.CreatematerialFG.reset();
        }
      },
      (err) => console.log(err)
    );
  }

  open(content) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});//.result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // },
    //  (reason) => {
    //   //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  openDeleteModal(name) {
    this.modalService.open(name);
  }

  deleteMaterial(MaterialID)
  {
    this._MaterialService.deleteMaterial(MaterialID).subscribe(
      data=>{
        let mat = this.materialList.find(m=>m.ID == MaterialID)
       
        const index = this.materialList.indexOf(mat)
  
        this.materialList.splice(index,1)
      
      }
      ,err=>{console.log(err)}
    )
  }

  Up(idToUp,idToDown)
  {
    
    this._MaterialService.GetMaterialUpp(this.materialList[idToUp].ID,this.materialList[idToDown].ID).subscribe(
      success=>
      {
         var swapMat;
         swapMat=this.materialList[idToUp];
         this.materialList[idToUp]=this.materialList[idToDown];
         this.materialList[idToDown]=swapMat;
      },
      err=>{console.log(err)}
    )

  }
  
  Dowm(idToDown,idToUp)
  {
    this._MaterialService.GetMaterialDown(this.materialList[idToDown].ID,this.materialList[idToUp].ID).subscribe(
      success=>
      {
         var swapMat;
         swapMat=this.materialList[idToUp];
         this.materialList[idToUp]=this.materialList[idToDown];
         this.materialList[idToDown]=swapMat;
      },
      err=>{console.log(err)}
    )
  }
}

