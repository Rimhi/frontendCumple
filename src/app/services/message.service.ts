import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from '../models/message.model';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class MessageService{
	public url:string;
	
	constructor(private _http:HttpClient){
		this.url = GLOBAL.url;
	}
	addMessage(token,message): Observable<any>{
		let params = JSON.stringify(message);
			let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

		return this._http.post(this.url+'message',params,{headers:headers});

	}
	getMessages(token,page=1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'receiver-messages/'+page,{headers:headers});
	}
	getEmmitMessages(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'emiter-messages',{headers:headers});
	}
	getChats(token):Observable<any>{
			let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'chats',{headers:headers});
	}
	getMessagesChat(token,id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'messages/'+id,{headers:headers});
	}
}