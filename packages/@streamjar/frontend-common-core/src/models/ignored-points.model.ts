import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { IChannel } from './channel.model';

export interface IIgnoredPointsUser {
	id: number;
	username: string;
	avatar: string;
	platform: string;
}

export class IgnoredPoints {
	constructor(protected jar: HttpService) {}

	public get(channel: IChannel): Observable<IIgnoredPointsUser[]> {
		return this.jar.get<IIgnoredPointsUser[]>(`channels/${channel.id}/points/ignored`);
	}

	public create(channel: IChannel, platform: string, username: string): Observable<IIgnoredPointsUser> {
		return this.jar.post<IIgnoredPointsUser>(`channels/${channel.id}/points/ignored`, { platform, username });
	}

	public delete(channel: IChannel, user: IIgnoredPointsUser): Observable<void> {
		return this.jar.post<void>(`channels/${channel.id}/points/ignored/${user.platform}/${user.id}`, {});
	}
}
