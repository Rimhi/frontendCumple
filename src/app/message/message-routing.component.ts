import  { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';




const messageRoutes:Routes=[
	{
		path:'messages',component:MainComponent,
		children:[
			{path:'',redirectTo:'recibidos',pathMatch:'full'},
			{path:'enviar',component:AddComponent},
			{path:'recibidos',component:ReceivedComponent},
			{path:'enviados/:id',component:SendedComponent}
		]
	}
]
@NgModule({

	imports:[
		RouterModule.forChild(messageRoutes),
	],
	exports:[
		RouterModule
	]
})
export class  MessageRoutingModule{}