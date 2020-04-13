import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from '../models/publication.model';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/GLOBAL';
import { User } from '../models/user.model';
import { UploadService } from '../services/upload.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { PublicationService } from '../services/publication.service';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers:[UserService,PublicationService,UploadService]
})
export class PublicationComponent implements OnInit {
	public publication: Publication;
	public identity;
	public token;
	public url:string = GLOBAL.url;
	public user: User;
	public stats;
  public message;

  constructor(
  	private _userService: UserService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _publicationService: PublicationService,
     private _uploadService: UploadService
   ) 
  { 
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    this.user = this.identity;
    this.stats = this._userService.getStats();
  	this.publication = new Publication("","","","",this.identity);
  }

  ngOnInit(): void {

  }
  onSubmit(form){
    this._publicationService.addPublication(this.token,this.publication).subscribe(
      response=>{
        this.message = response.message;
        //this.publication = response.publication;
        if(this.filesToUpload && this.filesToUpload.length){
          this._uploadService.makeFileRequest(this.url+'upload-image-publication/'+response.publication._id,[],this.filesToUpload,this.token,'image')
          .then((result:any)=>{
            this.publication.file = result.image;
          });
        }
        form.reset();
        setTimeout(() => 
    {
        this.message="";
    },
    2000);
      },err=>{
        console.log(err);
        if(err.error.cambiartoken){
          this._userService.logout();
        }
      }
    );
  }
   @Output() sended = new EventEmitter();
   sendPublication(event){
     this.sended.emit({send:'true'});
   }
   public filesToUpload:Array<File>;
   fileChageEvent(fileInput:any){
     this.filesToUpload = <Array<File>>fileInput.target.files;
   }

}
