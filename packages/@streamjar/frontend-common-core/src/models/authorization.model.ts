import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel, Dated, ManipulateHook } from './base';
import { IOAuthApplication } from './oauth-application.model';

export interface IAuthorization extends Dated {
	id: number;
	scopes: string[];
	application: IOAuthApplication;
}

export class Authorization extends BaseModel<IAuthorization> implements ManipulateHook<IAuthorization> {
	public static writable: string[] = [];
	public endpoint = 'authorizations';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public manipulateHook(val: IAuthorization): IAuthorization {
		return {
			...val,
			scopes: (<any>val.scopes).split(','),
		}
	}

	public authorize(
		channelId: number, clientId: string, data: { scopes: string[]; redirect: string; response_type: string },
	): Observable<{ code?: string; access_token?: string; expires_in: number }> {
		return this.jar
			.post<{ code?: string; access_token?: string; expires_in: number }>(`channels/${channelId}/authorizations/${clientId}`, data);
	}
}
