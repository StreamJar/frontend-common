import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { pick } from '../utils';
import { Dated, Identifiable } from './base';

export interface IOAuthApplication extends Dated, Identifiable {
	name: string;
	website: string;
	client?: string;
	redirect: string;
	secret?: string | boolean; 
	suspended?: boolean;
}

export class OAuthApplication {
	private writable = ['website', 'redirect', 'name'];

	constructor(private jar: HttpService) {}

	public getAll(): Observable<IOAuthApplication[]> {
		return this.jar.get<IOAuthApplication[]>(`oauth/applications`);
	}

	public get(id: string): Observable<IOAuthApplication> {
		return this.jar.get<IOAuthApplication>(`oauth/applications/${id}`);
	}

	public create(data: any): Observable<IOAuthApplication> {
		return this.jar.post<IOAuthApplication>(`oauth/applications`, { ...pick(data, this.writable), secret: !!data.secret });
	}

	public update(application: IOAuthApplication, data: any): Observable<IOAuthApplication> {
		return this.jar.patch<IOAuthApplication>(`oauth/applications/${application.client}`, pick(data, this.writable));
	}

	public delete(application: IOAuthApplication): Observable<void> {
		return this.jar.delete<void>(`oauth/applications/${application.client}`);
	}
}
