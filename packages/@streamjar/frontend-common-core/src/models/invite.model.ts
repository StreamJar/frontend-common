import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { Dated } from './base';
import { IChannel } from './channel.model';

export interface IInvite extends Dated {
	id: number;
	name: string;
	scopes: string[];
}

export class Invite {
	constructor(private jar: HttpService) {}

	public getAll(channel: IChannel): Observable<IInvite[]> {
		return this.jar.get<IInvite[]>(`channels/${channel.id}/invites`);
	}

	public create(channel: IChannel, data: { name: string; platform: string }): Observable<IInvite> {
		return this.jar.post<IInvite>(`channels/${channel.id}/invites`, data);
	}

	public delete(channel: IChannel, invite: IInvite): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/invites/${invite.id}`);
	}
}
