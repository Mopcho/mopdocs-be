export class UserCreatedEvent {
	id: string;

	constructor(data: { id: string }) {
		this.id = data.id;
	}
}
