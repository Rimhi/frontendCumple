import  { OnInit, DoCheck, Component } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { Message } from '../../../models/message.model';
import { Follow } from '../../../models/follow.model';
import { GLOBAL } from '../../../services/GLOBAL';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../models/user.model';
import { Chat } from '../../../models/chat.model';
import { UserService } from '../../../services/user.service';



@Component({
	selector:'main',
	templateUrl:'./main.component.html',
	providers:[FollowService,MessageService,UserService]
})
export class MainComponent implements OnInit{
	public title:string;
	public mensaje;
	public message:Message;
	public identity;
	public token;
	public url;
	public page=1;
	public messages: Message[];
	public follows: Follow[];
	public chats: Chat[];

	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _followService:FollowService,
		private _userService : UserService,
		private _messageService:MessageService){
		this.title =  "Enviados";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.message = new Message("","","",this.identity._id,"","");
	}
	ngOnInit(){
		this.getChats();
		this.getMyFollows();
	}
	getChats(){
		this._messageService.getChats(this.token).subscribe(
			response=>{
						
					this.chats = response.chats;
			},err=>{
			if(err.error.cambiartoken){
				this._userService.logout();
			}
		});
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
