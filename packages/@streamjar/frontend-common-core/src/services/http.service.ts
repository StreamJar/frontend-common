import { get } from 'js-cookie';
import { Observable } from 'rxjs';

const viewerEndpoints = [
	'viewer',
	'giveaways/wins',
];

export interface IHttpConfig {
	endpoint: string;
	version: string;
}

export abstract class HttpService {
	constructor(public readonly config: IHttpConfig) {

	}

	public abstract get<T>(uri: string): Observable<T>;
	public abstract post<T>(uri: string, body: any): Observable<T>;
	public abstract patch<T>(uri: string, body: any): Observable<T>;
	public abstract put<T>(uri: string, body: any): Observable<T>;
	public abstract delete<T>(uri: string): Observable<T>;

	public getHeaders(url: string): { [key: string]: string } {
		const header: { [key: string]: string } = {};

		if (get('apikey')) {
			header['Authorization'] = `JWT ${get('apikey')}`;
		}

		if (get('apikey.viewer') && viewerEndpoints.some(a => url.endsWith(a))) {
			header['Authorization'] = `Token ${get('apikey.viewer')}`;
		}

		return header;
	}

	public buildUrl(url: string = ''): string {
		return `${this.config.endpoint}/v${this.config.version}/${url}`;
	}
}
