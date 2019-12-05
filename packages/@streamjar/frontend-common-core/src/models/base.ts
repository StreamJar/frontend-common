import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';
import { pick } from '../utils';

export type platform = 'mixer' | 'twitch' | 'smashcast' | 'youtube' | 'gamewisp';

export interface Identifiable {
	id?: number;
}

export interface Dated {
	createdAt?: string;
	updatedAt?: string;
}

export interface BeforeWrite<T> {
	beforeHook(data: T): T;
}

export interface ManipulateHook<T> {
	manipulateHook(data: T): T;
}

export interface BeforeUpdate<T> {
	beforeUpdate(data: T): T;
}

export interface IFeatureFlags {
	[key: string]: boolean;
}

export abstract class BaseModel<T> {
	public endpoint: string;
	public writable: string[] = [];

	public static query(data: { [name: string]: string | string[] | undefined }): string {
		if (!data || Object.keys(data).length === 0) {
			return '';
		}

		return `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;
	}

	constructor(protected jar: HttpService) { }

	public beforeHook?(T: any): T
	public beforeUpdate?(T: any): T
	public manipulateHook?(T: any): T

	protected getId(data: T): any {
		return (<any>data).id;
	}

	protected fetchData(data: T) {
		if (this.writable.length === 0) {
			return data;
		}

		return pick(data, this.writable);
	}

	public getAll(channel: IChannel, query: { [name: string]: string | string[] } = {}): Observable<T[]> {
		return this.jar.get(`channels/${channel.id}/${this.endpoint}${BaseModel.query(query)}`)
			.pipe(map((val: T[]) => {
				if (this.manipulateHook) {
					return <T[]>val.map(value => this.manipulateHook && this.manipulateHook(value));
				}

				return <T[]>val;
			}));
	}

	public get(channel: IChannel, id: any): Observable<T> {
		return this.jar.get(`channels/${channel.id}/${this.endpoint}/${id}`)
			.pipe(map(val => {
				if (this.manipulateHook) {
					return <T>this.manipulateHook(val);
				}

				return <T>val;
			}));
	}

	public create(channel: IChannel, obj: T): Observable<T> {
		if (this.beforeHook) {
			obj = this.beforeHook(obj);
		}

		return this.jar.post(`channels/${channel.id}/${this.endpoint}`, this.fetchData(obj))
			.pipe(map(val => {
				if (this.manipulateHook) {
					return <T>this.manipulateHook(val);
				}

				return <T>val;
			}));
	}

	public update(channel: IChannel, obj: T): Observable<T> {
		if (this.beforeHook) {
			obj = this.beforeHook(obj);
		}

		if (this.beforeUpdate) {
			obj = this.beforeUpdate(obj);
		}

		return this.jar.patch(`channels/${channel.id}/${this.endpoint}/${this.getId(obj)}`, this.fetchData(obj))
			.pipe(map(val => {
				if (this.manipulateHook) {
					return <T>this.manipulateHook(val);
				}

				return <T>val;
			}));
	}

	public delete(channel: IChannel, obj: T): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/${this.endpoint}/${this.getId(obj)}`);
	}
}
