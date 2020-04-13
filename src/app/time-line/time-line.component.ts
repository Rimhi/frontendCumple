import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/GLOBAL';
import { User } from '../models/user.model';
import { Publication } from '../models/publication.model';
import { PublicationService } from '../services/publication.service';
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css'],
  providers:[UserService,PublicationService]
})
export class TimeLineComponent implements OnInit {
 	public title = 'TimeLine';
	public identity;
	public token;
	public url:string = GLOBAL.url;
	public user: User;
	public publications:Publication[];
	public message;
	public page=1;
	public total;
	public pages;
	public items;
	public nomore =true;
  constructor(
  	private _userService: UserService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _publicationService: PublicationService) { 
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.getPublications(this.page);
  }

  ngOnInit(): void {
  }
  getPublications(page,adding=false){
  		this._publicationService.getPublications(this.token,page).subscribe(
  			response=>{
  				//this.message = response.message;
  				
  				this.total = response.total;
  				this.page = +response.page;
  				this.pages = response.pages;
  				this.items = response.itemsPerPage;
  				if(this.page > this.pages){
  					this._router.navigate(['/timeline',1]);
  				}
  				if(!adding){
  					this.publications = response.publications;
  				}else{
  					var arrayA = this.publications;
  					var arrayB = response.publications;
  					this.publications = arrayA.concat(arrayB);
  					if(this.publications.length == (this.total)){
  						this.nomore = false;
  					}
  					//$('html','body').animate({scrollTop:$('body').pro("scrollHeight")},500);
  				}
  				console.log(response);
  		},err=>{
  			if(err.error.cambiartoken){
  				this._userService.logout();
  			}
  		});
  }
  
  viewMore(){
  	if(this.publications.length == (this.total)){
  		this.nomore = false;
  	}else{
  		this.page+=1;
  	}

  	this.getPublications(this.page,true);
  }
  refresh(){
    this.getPublications(this.page);
  }
  deletePublication(id){
      this._publicationService.deletePublication(this.token,id).subscribe(
        response=>{
          this.refresh();
        },err=>{
          if(err.error.cambiartoken){
          this._userService.logout();
        }
        });
  }

}
