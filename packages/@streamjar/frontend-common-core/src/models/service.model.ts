import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { Dated } from './base';
import { IChannel } from './channel.model';

export interface IService extends Dated {
	id: number;
	name: string;
	platform: string;
	enabled: boolean;
}

export interface IServiceBotURL {
	url: string;
}

export class Service {
	constructor(private jar: HttpService) {}

	public getAll(channel: IChannel): Observable<IService[]> {
		return this.jar.get<IService[]>(`channels/${channel.id}/services`);
	}

	public link(channelId: number, platform: string, code: string, state: string): Promise<IService> {
		const data = { state, code, provider: platform };

		if (data['state'] === '') {
			delete data['state']
		}

		return this.jar.post<IService>(`channels/${channelId}/services`, data)
			.toPromise();
	}

	public linkBot(channelId: number, platform: string, code: string, state: string): Promise<IService> {
		const data = { state, code };

		if (data['state'] === '') {
			delete data['state']
		}

		return this.jar.post<IService>(`channels/${channelId}/services/${platform}/bot`, data).toPromise();
	}

	public getLoginURLs(channel: IChannel, platform: string): Observable<IServiceBotURL> {
		return this.jar.get<IServiceBotURL>(`channels/${channel.id}/services/${platform}/bot`);
	}

	public update(channel: IChannel, service: IService, data: any): Observable<IService> {
		return this.jar.patch<IService>(`channels/${channel.id}/services/${service.platform}`, data)
	}

	public delete(channel: IChannel, service: IService): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/services/${service.platform}`);
	}
}
