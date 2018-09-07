import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';

export interface ILocationData {
	city: string;
	country: string;
	ip: string;
}

export interface IDeviceData {
	browserFamily: string;
	browserVersion: string;
	osFamily: string;
	osVersion: string;
	deviceName: string;
	deviceVersion: string;
	ua: string;
}

export interface ISession extends ILocationData, IDeviceData {
	expires: Date;
	lastSeen: Date;
	administrative: boolean;
	revoked: boolean;
	userId: number;
	createdAt: Date;
	token: string,
}

export class Session {
	constructor(private jar: HttpService) {}

	public getAll(): Observable<ISession[]> {
		return this.jar.get<ISession[]>(`account/sessions`);
	}

	public delete(session: ISession): Observable<void> {
		return this.jar.delete<void>(`account/sessions/${session.token}`);
	}

	public deleteAll(): Observable<void> {
		return this.jar.delete<void>(`account/sessions`);
	}
}
