import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';

export interface IExtralife {
	participantID: string;
}

export interface ITiltify {
	apikey: string;
}

export interface IGreetings {
	[platform: string]: {
		follow: string;
		sub: string;
		host: string;
		resub: string;
		tip: string;
		tweet: string;
		gamewispSub: string;
		gamewispResub: string;
	}
}

export interface ISchedule {
	interval: number;
	muteWhenOffline: boolean;
}

export interface ITips {
	agreement: string;
	optInFees: boolean;
}

export interface IPayment {
	paypal: string;
	currency: string;
}

export interface ILinks {
	resolve: boolean;
}

export class Settings {
	constructor(protected jar: HttpService) { }

	public getExtralife(channel: IChannel): Observable<IExtralife> {
		return this.jar.get<IExtralife>(`channels/${channel.id}/settings/extralife`);
	}

	public updateExtralife(channel: IChannel, data: IExtralife): Observable<IExtralife> {
		return this.jar.patch<IExtralife>(`channels/${channel.id}/settings/extralife`, data);
	}

	public getTiltify(channel: IChannel): Observable<ITiltify> {
		return this.jar.get<ITiltify>(`channels/${channel.id}/settings/tiltify`);
	}

	public updateTiltify(channel: IChannel, data: ITiltify): Observable<ITiltify> {
		return this.jar.patch<ITiltify>(`channels/${channel.id}/settings/tiltify`, data);
	}

	public getGreetings(channel: IChannel): Observable<IGreetings> {
		return this.jar.get<IGreetings>(`channels/${channel.id}/settings/greetings`);
	}

	public updateGreetings(channel: IChannel, data: IGreetings): Observable<IGreetings> {
		return this.jar.patch<IGreetings>(`channels/${channel.id}/settings/greetings`, data);
	}

	public getSchedule(channel: IChannel): Observable<ISchedule> {
		return this.jar.get<ISchedule>(`channels/${channel.id}/settings/schedule`);
	}

	public updateSchedule(channel: IChannel, data: ISchedule): Observable<ISchedule> {
		return this.jar.patch<ISchedule>(`channels/${channel.id}/settings/schedule`, data);
	}
	public getTips(channel: IChannel): Observable<ITips> {
		return this.jar.get<ITips>(`channels/${channel.id}/settings/tips`);
	}

	public updateTips(channel: IChannel, data: ITips): Observable<ITips> {
		return this.jar.patch<ITips>(`channels/${channel.id}/settings/tips`, data);
	}

	public getPayment(channel: IChannel): Observable<IPayment> {
		return this.jar.get<IPayment>(`channels/${channel.id}/settings/payment`);
	}

	public updatePayment(channel: IChannel, data: IPayment): Observable<IPayment> {
		return this.jar.patch<IPayment>(`channels/${channel.id}/settings/payment`, data);
	}

	public deletePayment(channel: IChannel): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/settings/payment`);
	}

	public getLinks(channel: IChannel): Observable<ILinks> {
		return this.jar.get<ILinks>(`channels/${channel.id}/settings/links`);
	}

	public updateLinks(channel: IChannel, data: ILinks): Observable<ILinks> {
		return this.jar.patch<ILinks>(`channels/${channel.id}/settings/links`, data);
	}
}
