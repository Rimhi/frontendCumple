import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FollowService } from '../services/follow.service';
import { PublicationService } from '../services/publication.service';
import { User } from '../models/user.model';
import { Follow } from '../models/follow.model';
import { Publication } from '../models/publication.model';
import { GLOBAL } from '../services/GLOBAL';
import { Router, ActivatedRoute, Params }	from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService,FollowService,PublicationService]
})
export class ProfileComponent implements OnInit{
  public title = 'Perfil';
  public identity;
  public token;
  public message;
  public url:string = GLOBAL.url;
  public user: User;
  public stats;
  public follow;
  public user_id;
  public publications:Publication[];
  public page=1;
  public total;
  public pages;
  public items;
  public nomore =true;
  public following;
  public followed;
  constructor(
  	private _userService: UserService, 
  	private _followService: FollowService, 
  	private _publicationService:PublicationService,
  	private _route: ActivatedRoute,
  	private _router: Router) {
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    this.user = this.identity;
    this.stats = this._userService.getStats();
  	}

  ngOnInit(): void {
  	this.loadPage();
  }
  
  getUser(id){
  	this._userService.getUser(id).subscribe(
  		response=>{
  			this.message = response.message;
  			this.user = response.user;
  			console.log(response);
  			this.following = response.following;
  			this.followed = response.followed;

  			//console.log(response);
  		},err=>{
  			if(err.error.cambiartoken){
  				this._userService.logout();
  			}
  			this._router.navigate(['/profile',this.identity._id]);
  		});
  }
  loadPage(){
  	this._route.params.subscribe(params=>{
  		let id = params['id'];
  		this.user_id = id;
  		this.getUser(id);
  		this.getCounter(id)
  		this.getPublicationUser(id);
  	});
  }
  getCounter(id){
  	this._userService.getCounters(id).subscribe(
  		response=>{
  			
  			this.stats = response;

  			
  		},err=>{
  			if(err.error.cambiartoken){
  				this._userService.logout();
  			}
  			this._router.navigate(['/profile',this.identity._id]);
  		});
  }
  public followUserOver;
  mouseEnter(user_id){
  	this.followUserOver= user_id;
  }
  mouseLeave(user_id){
  	this.followUserOver= 0;
  }
  followUser(followed){
    var follow = new Follow('',this.identity._id,followed);
    this._followService.addFollow(this.token,follow).subscribe(
      response=>{
        this.message = response.message;
        this.following = true;
    },err=>{
      console.log(err);
          this.message = err.error.message;
          if(err.error.cambiartoken){
            this._userService.logout();
          }
    });
  }
  deleteFollow(unfollow){
    this._followService.deleteFolow(this.token,unfollow).subscribe(
      response=>{
        this.message = response.message;
        this.following = null;
      },err=>{
        console.log(err);
          this.message = err.error.message;
          if(err.error.cambiartoken){
            this._userService.logout();
          }
    });
  }
  getPublicationUser(id,adding=false){
  	this._publicationService.getPublicationUser(this.token,id,this.page).subscribe(
  		response=>{
  			console.log(response);
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
  				}
  		},err=>{
  			console.log(err);
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

  	this.getPublicationUser(this.page,true);
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
  refresh(){
    this.getPublicationUser(this.user_id);
  }

}
