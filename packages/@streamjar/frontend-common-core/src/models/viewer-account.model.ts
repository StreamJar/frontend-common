import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';

export interface IViewerAccount {
	email: string;
	name: string;
	platform: string;
	user: number;
}

export class ViewerAccount {
	constructor(private jar: HttpService) {
	}

	public get(): Observable<IViewerAccount> {
		return this.jar.get<IViewerAccount>('viewer');
	}

	public login(platform: string, data: { code?: string; access_token?: string; state?: string }): Observable<{token: string }> {
		return this.jar.post<{ token: string }>(`viewer/auth/${platform}`, data);
	}
}
