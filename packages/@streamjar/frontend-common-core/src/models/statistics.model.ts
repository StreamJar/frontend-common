import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';

export interface ISummary {
	characters: number;
	earned: number;
	followers: number;
	messages: number;
	points: number;
	spent: number;
	subscribers: number;
	tips: number;
	viewers: number;
	views: number;
	words: number;
}

export type IStatistic = [ number, number ];

export class Statistics {
	constructor(private jar: HttpService) {}

	public summary(channel: IChannel): Observable<ISummary> {
		return this.jar.get<ISummary>(`channels/${channel.id}/statistics/summary`);
	}

	public getViews(channel: IChannel, hours: number = 24): Observable<IStatistic[]> {
		return this.jar.get<IStatistic[]>(`channels/${channel.id}/statistics/time/views?hours=${hours}`);
	}

	public getFollowers(channel: IChannel, hours: number = 24): Observable<IStatistic[]> {
		return this.jar.get<IStatistic[]>(`channels/${channel.id}/statistics/time/followers?hours=${hours}`);
	}

	public getMessages(channel: IChannel, hours: number = 24): Observable<IStatistic[]> {
		return this.jar.get<IStatistic[]>(`channels/${channel.id}/statistics/time/messages?hours=${hours}`);
	}

	public getViewers(channel: IChannel, hours: number = 24): Observable<IStatistic[]> {
		return this.jar.get<IStatistic[]>(`channels/${channel.id}/statistics/time/viewers?hours=${hours}`);
	}
}
