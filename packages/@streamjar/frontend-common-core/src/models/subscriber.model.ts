import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';
import { platform, BaseModel, Dated} from './base';

export interface ISubscriber extends Dated {
	user: number;
	name: number;
	avatar: string;
	platform: platform;
	since: string;
	expiry: string;
}

export class Subscriber extends BaseModel<ISubscriber> {
	public static writable: string[] = [];
	public endpoint = 'subscribers';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public remove(channel: IChannel, subscriber: ISubscriber): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/${this.endpoint}/${subscriber.platform}/${subscriber.user}`);
	}
}
