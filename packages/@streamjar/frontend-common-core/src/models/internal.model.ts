import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';

export interface IBotStatus {
	service: IBotStatusService;
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

export class Internal {
	constructor(private jar: HttpService) {}

	public getBotStatus(config: { serviceId?: string[]; bots?: string[]; channelId?: string[] } = {}): Observable<IBotStatus[]> {
		return this.jar.post<IBotStatus[]>(`internal/bot-status`, config);
	}

	public getBots(): Observable<string[]> {
		return this.jar.get<string[]>(`internal/bot-status/bots`);
	}
}
