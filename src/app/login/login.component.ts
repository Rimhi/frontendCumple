import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public title:string;
	public user:User;
	public message:string;
	public identity;
	public status = false;
	public token;
	hide = true;
	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService : UserService
	){ 
  	this.title = "Identificate";
  	this.user = new User("","","","","","","ROLE_USER","");
  }
  ngOnInit(): void {
  
  }
  onSubmit(form){
		this._userService.singup(this.user).subscribe(
			response =>{
				//console.log(response);
				this.identity = response.user;
				if(this.identity == null){
					this.message=response.message;
					
				}else{
					//guardar datos en el local storage
					localStorage.setItem('identity',JSON.stringify(this.identity));
					
					
					this.getToken();
	
				}
				//console.log(response.user);
		},err=>{
			//console.log(err);

			this.message = err.message;
		});
	}
	getToken(){
		this._userService.singup(this.user, 'true').subscribe(
			response =>{
				//console.log(response);
				this.token = response.token;
				if(this.token.length<=0){
					this.message=response.message;
				}else{
					//guardar datos en el local storage
					
					this.message = response.message;
					localStorage.setItem('token',this.token);
					this.getCounters();
					//conseguir los contadores o estadisticas
				}
				//console.log(response.user);
				//console.log(this.token);
		},err=>{
			this.message = err;
		});
	}
	getCounters(){
		this._userService.getCounters().subscribe(
			response=>{
				//console.log(response);
				localStorage.setItem('stats',JSON.stringify(response));
				this.status = true;
				setTimeout(() => 
					{
					    this._router.navigate(['/']);
					},
					1500);
			},err=>{
				if(err==null){
					console.log("hay error fuerte");
				}
				
			});
	}
	email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Escribe un email real';
    }

    return this.email.hasError('email') ? 'El Correo no es valido' : '';
  }
	
}
