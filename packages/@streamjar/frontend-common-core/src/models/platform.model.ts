import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { Dated } from './base';

export interface IPlatform extends Dated {
	id: number;
	username: string;
	platform: string;
	avatar: string;
}

export class Platform {
	constructor(private jar: HttpService) {}

	public getAll(): Observable<IPlatform[]> {
		return this.jar.get<IPlatform[]>(`account/platforms`);
	}

	public create(type: string, params: any): Promise<IPlatform> {
		const data = { type, ...params };

		if (data['state'] === '') {
			delete data['state'];
		}

		return this.jar.post<IPlatform>(`account/platforms`, data)
		.toPromise();
	}

	public delete(name: string): Promise<void> {
		return this.jar.delete<void>(`account/platforms/${name}`)
		.toPromise();
	}
}
