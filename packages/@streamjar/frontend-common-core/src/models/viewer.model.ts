import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel, Dated, Identifiable } from './base';
import { IBoost } from './boost.model';
import { IChannel } from './channel.model';

export interface IViewer {
	name: string;
	boost: IBoost;
	avatar: string;
	platform: string;
	points: number;
	user: number;
	createdAt: string;
	updatedAt: string;
	reasons: any;
}

export interface IViewerWarning extends Dated, Identifiable {
	reason: string;
	value: string;
	expired: boolean;
}

export class Viewer extends BaseModel<IViewer> {
	public endpoint = 'viewers';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public get(channel: IChannel, platform: string, username?: string): Observable<IViewer> {
		return super.get(channel, `${platform}/${username}`);
	}

	public getWarnings(channel: IChannel, viewer: IViewer): Observable<IViewerWarning[]> {
		return this.jar.get<IViewerWarning[]>(`channels/${channel.id}/viewers/${viewer.platform}/${viewer.name}/warnings`);
	}

	public addWarning(channel: IChannel, viewer: IViewer, reason: string): Observable<IViewerWarning> {
		return this.jar.post<IViewerWarning>(`channels/${channel.id}/viewers/${viewer.platform}/${viewer.name}/warnings`, { value: reason });
	}

	public deleteWarning(channel: IChannel, viewer: IViewer, warning: IViewerWarning): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/viewers/${viewer.platform}/${viewer.name}/warnings/${warning.id}`);
	}
}
