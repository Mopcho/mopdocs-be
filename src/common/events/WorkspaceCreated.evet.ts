export class WorkspaceCreatedEvent {
	id: string;
	ownerId: string;

	constructor(data: { id: string; ownerId: string }) {
		this.id = data.id;
		this.ownerId = data.ownerId;
	}
}
