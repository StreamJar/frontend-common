import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { pick } from '../utils';
import { Dated } from './base';

export interface IAccount  extends Dated {
	username: string;
	email: string;
	role: string;
	avatar?: string;
	primaryChannel: string;
	optInMarketing: boolean;
}

export interface ILoginToken {
	jwt?: string;
	signup?: string;
}

export interface ILoginURLs {
	[name: string]: string;
}

export interface IAccountInvite extends Dated {
	avatar: string;
	channel: string;
	id: number;
	name: string;
	platform: string;
	scopes: string[];
}

export class Account {
	public writable: string[] = ['optInMarketing'];

	constructor(private jar: HttpService) {}

	public get(): Promise<IAccount> {
		return this.jar.get<IAccount>(`account`).toPromise();
	}

	public getLoginURLs(): Observable<ILoginURLs> {
		return this.jar.get<ILoginURLs>(`account/login`);
	}

	public login(platform: string, data: any): Promise<ILoginToken> {
		if (data['state'] === '') {
			delete data['state']
		}

		return this.jar.post<ILoginToken>(`account/login/${platform}`, data).toPromise();
	}

	public signup(
		token: string, name: string, opts: { tipsEnabled?: boolean, botEnabled?: boolean; noChannel?: boolean } = {},
	): Promise<ILoginToken> {
		return this.jar.post<ILoginToken>(`account/signup`, { signup: token, username: name, ...opts}).toPromise()
	}

	public getInvites(): Observable<IAccountInvite[]> {
		return this.jar.get<IAccountInvite[]>(`account/invites`);
	}

	public acceptInvite(invite: IAccountInvite): Observable<void> {
		return this.jar.patch< void>(`account/invites/${invite.id}`, {});
	}

	public deleteInvite(invite: IAccountInvite): Observable<void> {
		return this.jar.delete<void>(`account/invites/${invite.id}`);
	}

	public update(account: IAccount): Observable<IAccount> {
		return this.jar.patch<IAccount>(`account`, pick(account, this.writable));
	}
}
