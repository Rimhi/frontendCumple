import { Component,OnInit,DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/GLOBAL';
import { User } from './models/user.model';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck,OnDestroy{
  title = 'PhotoChat';
  public identity;
  public token;
  public url:string = GLOBAL.url;
  public user: User;
  public isDarkTheme = false;
  public stats;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
  	private _userService: UserService,
    private _route: ActivatedRoute,
    private _router : Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  	){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    

  }
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    this.user = this.identity;
    this.stats = this._userService.getStats();
    //console.log(this.stats);

  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
    this.user = this.identity;
    if(this.user && this.identity){this.getStats();}
    

        //console.log(this.token);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
   this._userService.logout();
  }
  getStats(){
    this._userService.getCounters().subscribe(
      response=>{
        //console.log(response);
        this.stats = response;
        localStorage.setItem('stats',JSON.stringify(response));
    
      },err=>{
        if(err==null){
          console.log("hay error fuerte");
        }
        
      });
  }
  refresh(event){
    this._router.navigate(['/timeline']);
  }

}
