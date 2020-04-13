import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class PublicationService{
	public url:string;
	public identity;
	public stats;

	constructor(public _http: HttpClient){
			this.url = GLOBAL.url;
	}
	addPublication(token,publication):Observable<any>{
		let params = JSON.stringify(publication);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.post(this.url+'publication',params,{headers:headers});
	}
	deletePublication(token,user_id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.delete(this.url+'delete-publication/'+user_id,{headers:headers});
	}
	getPublication(token,id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'publication/'+id,{headers:headers});
	}
	getPublications(token,page=1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'publications/'+page,{headers:headers});
	}
	getPublicationUser(token,id,page=1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url+'mypublications/'+id+"/"+page,{headers:headers});
	}
}