import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel, Dated } from './base';
import { IChannel } from './channel.model';
import { omit } from '../utils';

export interface ITip extends Dated {
	id: number;
	email: string;
	name: string;
	amount: number;
	currency: string;
	message: string;
	avatar: string;
	fields: any[];
	hidden: string;
	tid: string;
	latitude: number;
	longitude: number;

}

export interface IExternalTip {
	method?: string;
	amount: number;
	name: string;
	message: string;
	fields: { [key: string]: any },
	platform?: string;
	payFees: boolean;
}

export interface ITipAudio {
	hash: string;
}

export interface IPaymentGatewayConfig {
	currency: string;
	enabled: boolean; 
	minAmount: number;
	maxAmount: number;
}

export class Tip extends BaseModel<ITip> {
	public static writable: string[] = [];
	public endpoint = 'tips';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public getSummary(channel: IChannel, filter: string): Observable<ITip[]> {
		return this.jar.get<ITip[]>(`channels/${channel.id}/tips/summary?sort=${filter}`);
	}

	public getConfig(channel: IChannel, gateway: string): Observable<IPaymentGatewayConfig> {
		return this.jar.get<IPaymentGatewayConfig>(`channels/${channel.id}/tip/${gateway}`);
	}

	public createExternalTip(channel: IChannel, tip: IExternalTip): Observable<{ redirect: string }> {
		return this.jar.post<{ redirect: string }>(`channels/${channel.id}/tip/${tip.method}`, omit(tip, 'method'));
	}

	public uploadAudio(channel: IChannel, file: any) {
		const fd = new FormData();
		fd.append('file', file);

		return this.jar.post<ITipAudio>(`channels/${channel.id}/tip/audio`, fd)
	}
}
