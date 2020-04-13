import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { GLOBAL } from '../services/GLOBAL';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService,UploadService]
})
export class UserEditComponent implements OnInit {
	public title:string;
	public user:User;
	public message:string = " "; 
	public identity;
	public status = false;
	public token;
	public url = GLOBAL.url;
  constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService : UserService,
		private _uploadService: UploadService
	){ 
  	this.title = "Actualizar mis datos";
  	this.user = this._userService.getIdentity();
  	this.identity = this.user;
  	this.token = this._userService.getToken();
  }
  ngOnInit(): void {
  }
  onSubmit(){
  	this._userService.updateUser(this.user).subscribe(response=>{
  		this.message = response.message;
  		setTimeout(() => 
					{
					    this.message="";
					},
					2000);
  		if(response.user){
  			this.user = response.user;
  			this.identity = this.user;
  			localStorage.setItem('identity',JSON.stringify(this.user));

  			//subir imagen de usuario
  			this._uploadService.makeFileRequest(this.url+'update-image-user',[],this.filesToUpload,this.token,"image")
  			.then((result:any)=>{
  				result = JSON.parse(result);
  				
  				this.message = result.message;
  				this.user.image = result.user.image;
  				this.identity = this.user;
  				localStorage.setItem('identity',JSON.stringify(this.identity));
  			});
  		}
  	},err=>{
  		if(err.error.cambiartoken){
  			this.message = err.message;
  			this._userService.logout();
       }
  		console.log(<any>err);

  	});
  }
  public filesToUpload: Array<File>;
  fileChange(fileInput:any){
  	this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
