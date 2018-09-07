import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';
import { platform, BaseModel, Dated } from './base';

export interface IFollower extends Dated {
	user: number;
	name: number;
	avatar: string;
	platform: platform;
}

export class Follower extends BaseModel<IFollower> {
	public static writable: string[] = [];
	public endpoint = 'followers';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public remove(channel: IChannel, follower: IFollower): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/${this.endpoint}/${follower.platform}/${follower.user}`);
	}
}
