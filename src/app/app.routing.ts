import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { ProfileComponent } from './profile/profile.component';
import { FollowingComponent } from './following/following.component';
import { FollowedComponent } from './followed/followed.component';
const appRoutes: Routes = [
	{ path:'',component: HomeComponent },
	{ path:'home',component: HomeComponent },
	{ path:'login',component:LoginComponent },
	{ path:'register',component:RegisterComponent },
	{ path:'mis-datos',component:UserEditComponent },
	{ path:'personas/:page',component:UserComponent },
	{ path:'personas',component:UserComponent },
	{ path:'timeline',component:TimeLineComponent },
	{ path:'timeline/:page',component:TimeLineComponent },
	{ path:'profile/:id',component:ProfileComponent },
	{ path:'following/:id/:page',component:FollowingComponent },
	{ path:'followed/:id/:page',component:FollowedComponent },
	{ path:'**',component:HomeComponent }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);