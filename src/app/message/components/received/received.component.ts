import  { OnInit, DoCheck, Component } from '@angular/core';



@Component({
	selector:'received',
	templateUrl:'./received.component.html'
})
export class ReceivedComponent implements OnInit{
	public title:string;

	constructor(){
		this.title =  "Recibidos"
	}
	ngOnInit(){
		
	}

}
