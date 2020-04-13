import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class UserService{
	public url:string;
	public identity;
	public stats;

	constructor(public _http: HttpClient,private _router: Router){
			this.url = GLOBAL.url;
	}

	register(user: User): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'register',params,{headers:headers});
	}
	singup(user: any, gettoken = null):Observable<any>{
		if (gettoken != null) {
			user.gettoken = gettoken;
		}
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'login',params,{headers:headers});
	}
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != undefined){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}
	getToken(){
		let token = localStorage.getItem('token');

		if(token == undefined){
			token = null;
		}
		return token;
	}
	getCounters(user_id=null):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		if(user_id!=null){
			return this._http.get(this.url+'counters/'+user_id,{headers:headers});
		}else{

			return this._http.get(this.url+'counters',{headers:headers});
		}
	}
	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));
		if(stats != undefined){
			this.stats = stats;
		}else{
			stats = null;
		}
		
		return this.stats;
	}
	updateUser(user:User):Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.put(this.url+'updateuser',params,{headers:headers});
	}
	getUsers(page=null):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.get(this.url+"users/"+page,{headers:headers});
	}
	getUser(user_id):Observable<any>{
			let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.get(this.url+"user/"+user_id,{headers:headers});
	}
	logout(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/']);	
	}

}