import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public title:string;
  public user:User;
  public message:string; 
  constructor(
  	private _route: ActivatedRoute,
  	private _router:Router,
  	private _userService:UserService
  ) { 
  	this.title = "Registrate";
  	this.user = new User("","","","","","","ROLE_USER","");
  }
  ngOnInit(): void {
  }
  onSubmit(form){
		this._userService.register(this.user).subscribe(
			response =>{
				this.message = response.message;
				if(response.user && response.user._id){
					form.reset();
				}
			},error =>{
				console.log(<any>error);
			}
		);
	}

}
