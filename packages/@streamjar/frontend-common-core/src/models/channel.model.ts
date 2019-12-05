import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { pick } from '../utils';
import { Dated, IFeatureFlags } from './base';

export interface IBaseChannel extends Dated {
	id: number,
	username: string,
	currency: string,
	avatar: string,
	botEnabled: boolean,
	tipsEnabled: boolean,
	tipsConfigured: boolean,
}

export interface IChannel extends IBaseChannel {
	services: string[],
	integrations: string[],

	scopes?: string[],
	primary?: boolean,
}

export interface IEvent extends Dated {
	event: string;
	user: number;
	name: string;
	avatar: string;
	platform: string;

	amount?: string;
	months?: string;
	currency?: string;
}

export interface IStatus {
	online: boolean;
	title: string;
	game: string;
	name: string;
	platform?: string;
}

export interface IStatuses {
	[platform: string]: IStatus
}

export interface ITicket {
	message: string;
	subject: string;
	topic: string;
	location: string;
}

export class Channel {
	constructor(private jar: HttpService) { }

	public get(name: string): Promise<IChannel> {
		return this.jar.get<IChannel>(`channels/${name}`).toPromise()
	}

	public getAll(): Observable<IChannel[]> {
		return this.jar.get<IChannel[]>(`channels`)
	}

	public update(channel: IChannel): Observable<IChannel> {
		return this.jar.patch<IChannel>(`channels/${channel.id}`, pick(channel, ['tipsEnabled', 'botEnabled']));
	}

	public getRecentEvents(channel: IChannel): Observable<IEvent[]> {
		return this.jar.get<IEvent[]>(`channels/${channel.id}/events`)
	}

	public getStatus(channel: IChannel): Observable<IStatus> {
		return this.jar.get<IStatus>(`channels/${channel.id}/status`)
	}

	public hasAccess(channel: IChannel, scopes: string[]): Observable<{ success: boolean, scopes: { [key: string]: boolean } }> {
		return this.jar.get<any>(`channels/${channel.id}/access?scope=${scopes.join('&scope=')}`);
	}

	public openTicket(channel: IChannel, ticket: ITicket): Observable<void> {
		return this.jar.post<void>(`support/ticket`, { ...ticket, channelId: channel.id });
	}

	public getFeatures(channel: IChannel): Observable<IFeatureFlags> {
		return this.jar.get<IFeatureFlags>(`channels/${channel.id}/features`)
	}
}
