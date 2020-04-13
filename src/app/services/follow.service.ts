import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class FollowService{
	public url:string;
	public identity;
	public stats;

	constructor(public _http: HttpClient){
			this.url = GLOBAL.url;
	}
	addFollow(token,follow):Observable<any>{
		let params = JSON.stringify(follow);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.post(this.url+'follow',params,{headers:headers});
	}
	deleteFolow(token,user_id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.delete(this.url+'follow/'+user_id,{headers:headers});
	}
	getFollowing(token,id,page=1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'follows/'+id+'/'+page,{headers:headers});						
	}
	getFollowed(token,id,page=1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'followed/'+id+'/'+page,{headers:headers});						
	}
	getMyfollows(token):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'getmyfollows/true',{headers:headers});
	}

}