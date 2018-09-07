import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel } from './base';
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

export class Viewer extends BaseModel<IViewer> {
	public endpoint = 'viewers';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public get(channel: IChannel, platform: string, username?: string): Observable<IViewer> {
		return super.get(channel, `${platform}/${username}`);
	}
}
