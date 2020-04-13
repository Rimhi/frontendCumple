import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { User } from '../models/user.model';
import { Follow } from '../models/follow.model';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/GLOBAL';
import { FollowService } from '../services/follow.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService,FollowService]
})
export class UserComponent implements OnInit {
	public title:string;
	public user:User;
	public message:string = " "; 
	public identity;
	public status = false;
	public token;
	public page;
	public next_page;
	public pre_page;
	public total;
	public pages;
	public users: User[];
	public url = GLOBAL.url;
	public follows;
  constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService : UserService,
    private _followService: FollowService
	){ 
  	this.title = "Personas";
  	this.user = this._userService.getIdentity();
  	this.identity = this.user;
  	this.token = this._userService.getToken();
  }
  ngOnInit(): void {
  		this.actualpage();
  		//console.log(this.users);
  }
  actualpage(){
  	this._route.params.subscribe(params=>{
  			let page = +params['page'];
  			this.page = page;
  			if(!page){
  				page = 1;
  			}else{
	  			this.next_page = page + 1;
	  			this.pre_page = page-1;
	  			if(this.pre_page==0){
	  				this.pre_page = 1;
	  			}
  			}
  			this.getUsers(page);
  	});
  }
  getUsers(page){
  		this._userService.getUsers(page).subscribe(response=>{
  				//console.log(response.users);
  				this.message = response.message;
  				this.total = response.total;
  				this.users = response.users;
  				this.pages = response.pages;
  				this.follows = response.users_following;
  				//console.log(this.follows);
  				//console.log(response)
  				if(page>this.pages){
  					this._router.navigate(['/personas',1]);
  				}
  		},error=>{
  				console.log(error);
  				this.message = error.error.message;
  				if(error.error.cambiartoken){
  					this._userService.logout();
  				}
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
        this.follows.push(followed);
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
        var search = this.follows.indexOf(unfollow);
        if(search!=-1){
          this.follows.splice(search,1);
        }
      },err=>{
        console.log(err);
          this.message = err.error.message;
          if(err.error.cambiartoken){
            this._userService.logout();
          }
    });
  }
}
