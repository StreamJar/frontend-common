import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

export interface IShortcode {
	code: string;
	identifier: string;
	expires_in: number;
	scopes: string[];
}

export interface IShortcodeState {
	status: boolean;
	error?: string;
	access_token?: string;
	expires_in?: number;
	code?: string;
}

export interface IShortcodeInfo {
	client_id: string;
	scopes: string[];
}

export class OAuthShortcode {
	constructor(private jar: HttpService) {}

	public create(clientId: string, scopes: string[], clientSecret?: string): Observable<IShortcode> {
		const resp: { client_id: string, client_secret?: string; scopes: string[] } = { client_id: clientId, scopes };

		if (clientSecret) {
			resp.client_secret = clientSecret;
		}

		return this.jar.post<IShortcode>(`oauth/shortcode`, resp);
	}

	public check(code: string): Observable<IShortcodeState | void> {
		return this.jar.get<IShortcodeState | void>(`oauth/shortcode/check/${code}`);
	}

	public use(code: string): Observable<IShortcodeInfo> {
		return this.jar.get<IShortcodeInfo>(`oauth/shortcode/use/${code}`);
	}
}
