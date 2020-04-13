import  { OnInit, DoCheck, Component } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { Message } from '../../../models/message.model';
import { Follow } from '../../../models/follow.model';
import { GLOBAL } from '../../../services/GLOBAL';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';


@Component({
	selector:'add',
	templateUrl:'./add.component.html',
	  styleUrls: ['./add.component.css'],
	providers:[FollowService,MessageService,UserService]
})
export class AddComponent implements OnInit{
	public title:string;
	public mensaje;
	public message:Message;
	public identity;
	public token;
	public url;
	public follows: Follow[];

	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _followService:FollowService,
		private _userService : UserService,
		private _messageService:MessageService){
		this.title =  "Enviar Mensaje";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.message = new Message("","","","",this.identity._id,"","");
	}
	ngOnInit(){
		this.getMyFollows();
	}
	onSubmit(form){
		this._messageService.addMessage(this.token,this.message).subscribe(
			response=>{

				this.mensaje = response.message;
				console.log(response);
				form.reset();
				this._router.navigate(['/messages/']);
			},err=>{

			}
			);
	}
	getMyFollows(){
		this._followService.getMyfollows(this.token).subscribe(
			response=>{
				this.follows = response.follows;
			},error=>{
				if(error.error.cambiartoken){
					this._userService.logout();
				}
			});
	}

}
