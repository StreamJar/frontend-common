import { HttpService } from '@streamjar/frontend-common-core';
import { Observable, Subject } from 'rxjs';

let apiAdapter: JarService;

export class InvalidResponseError extends Error {
	public statusCode: number;

	constructor(response: Response, public payload: any) {
		super(`Error ${response.status}`);
		this.statusCode = response.status;
		Object.setPrototypeOf(this, InvalidResponseError.prototype);
	}
}

export class JarService extends HttpService {
	private getHeadersFn: (url: string) => Promise<{ [key: string]: string }>;

	constructor(config: { version: string, endpoint: string }, headersFn?: (url: string) => Promise<{ [key: string]: string }>) {
		super(config);

		if (headersFn) {
			this.getHeadersFn = headersFn;
		}
	}

	public get<T>(uri: string): Observable<T> {
		return this.request<T>('GET', uri);
	}

	public post<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('POST', uri, body);
	}

	public patch<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('PATCH', uri, body);
	}

	public put<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('PUT', uri, body);
	}

	public delete<T>(uri: string): Observable<T> {
		return this.request<T>('DELETE', uri);
	}

	private request<T>(method: string, url: string, body?: string): Observable<T> {
		const obs = new Subject<T>();

		let bodyValue;

		(this.getHeadersFn ? this.getHeadersFn(url) : Promise.resolve(this.getHeaders(url))).then(headers => {
			if (body) {
				bodyValue = JSON.stringify(body);
				headers['Content-Type'] = 'application/json';
			}

			return fetch(this.buildUrl(url), {
				body: bodyValue,
				headers: headers,
				method: method.toUpperCase(),
			}).then(async (value) => {
				if (!value.ok) {
					throw new InvalidResponseError(value, await value.json());
				}

				if (value.status === 204) {
					return null;
				}

				return value.json();
			}).then(value => {
				obs.next(value);
				obs.complete();
			}).catch((err) => {
				obs.error(err);
				obs.complete();
			});
		});

		return obs;
	}
}

export const getApi = <T>(item: new (a: HttpService) => T): T => {
	return new (<any>item)(apiAdapter);
}

export const setApiAdapter = (adapter: JarService): void => {
	apiAdapter = adapter;
}
