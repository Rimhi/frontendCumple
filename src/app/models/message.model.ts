export class Message{
	constructor(
		public _id: string,
		public text: string,
		public created_at: string,
		public emiter: string,
		public receiver: string,
		public viewed: string,
		public chat:string
	){}
}