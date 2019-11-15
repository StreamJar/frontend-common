import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { Dated, Identifiable } from './base';
import { IService } from './service.model';

export interface IBotStatus {
	service: IBotStatusService;
	status: string;
	servers: IBotStatusBot[];
}

export interface IBotStatusService {
	id: number;
	name: string;
	platform: string;
	channelId: string;
}

export interface IBotStatusBot {
	server: string;
	status: string;
}

export interface IInternalChannel extends Identifiable, Dated {
	username: string;
	avatar: string;
	tipsEnabled: string;
	botEnabled: string;
}

export interface IInternalService extends Identifiable, Dated {
	name: string;
	platform: string;
	platformId: string;
	botId: string;
	botName: string;
	enabled: boolean;
	channelId: number;
}

export interface IAdminService extends IService {
	platformId: string;
	botId: string;
	botName: string;
	partner: boolean;
	pool: string | null;
	deletedAt: string | null;
	channelId: number;
}

export class Internal {
	constructor(private jar: HttpService) { }

	public getBotStatus(config: { serviceId?: string[]; bots?: string[]; channelId?: string[] } = {}): Observable<IBotStatus[]> {
		return this.jar.post<IBotStatus[]>(`internal/bot-status`, config);
	}

	public getBots(): Observable<string[]> {
		return this.jar.get<string[]>(`internal/bot-status/bots`);
	}

	public searchChannels(query: string): Observable<IInternalChannel[]> {
		return this.jar.get<IInternalChannel[]>(`internal/search/channels?query=${query}`);
	}

	public searchServices(query: string): Observable<IInternalService[]> {
		return this.jar.get<IInternalService[]>(`internal/search/services?query=${query}`);
	}

	public getServices(channelId: number): Observable<IAdminService[]> {
		return this.jar.get<IAdminService[]>(`internal/admin/channel/${channelId}/services`);
	}

	public updateService(service: IAdminService, data: { pool: string | null }): Observable<void> {
		return this.jar.patch<void>(`internal/admin/channel/${service.channelId}/services/${service.id}`, data);
	}

	public reconnectService(service: IAdminService): Observable<void> {
		return this.jar.post<void>(`internal/admin/channel/${service.channelId}/services/${service.id}/reconnect`, {});
	}
}
