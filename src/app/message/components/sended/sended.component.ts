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
	selector:'sended',
	templateUrl:'./sended.component.html',
	styleUrls:['./sended.component.css'],
	providers:[FollowService,MessageService,UserService]
})
export class SendedComponent implements OnInit{
	public title:string;
	public mensaje;
	public message:Message;
	public identity;
	public token;
	public url;
	public page=1;
	public messages: Message[];
	public receiver_id;

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
		this.message = new Message("","","",this.identity._id,"","","");
	}
	ngOnInit(){
		this.getMessages();
	}
	getMessages(){
	this._route.params.subscribe(params=>{
		let id = params['id'];
		this._messageService.getMessagesChat(this.token,id).subscribe(
			response=>{
				for(let message of response.messages){
					this.receiver_id = message.receiver._id;
				}
					/*console.log(response.messages);
					console.log(this.identity);*/
					this.messages = response.messages; 
			},err=>{
			if(err.error.cambiartoken){
				this._userService.logout();
			}
		});
	});
		
	}
	getRecepter(){

	}
	onSubmit(form){
		this._route.params.subscribe(params=>{
			let id = params['id'];
			this.message.chat = id;
			this.message.receiver = this.receiver_id;
		this._messageService.addMessage(this.token,this.message).subscribe(
			response=>{

				this.mensaje = response.message;
				console.log(response);
				form.reset();
				this.getMessages()
			},err=>{
				if(err.error.cambiartoken){
					this._userService.logout();
				}
			}
			);
		});
	}

}
