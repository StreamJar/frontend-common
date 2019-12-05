import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { pick } from '../utils';
import { Dated, IFeatureFlags } from './base';

export interface IAccount extends Dated {
	username: string;
	email: string;
	role: string;
	avatar?: string;
	primaryChannel: string;
	optInMarketing: boolean;
	features: IFeatureFlags;
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

export interface IAccountUsername {
	username: string;
	taken: boolean;
	active: boolean;
}

export interface IAccountUsernameState {
	canChange: boolean;
	expiresAfterDays: number;
	usernames: IAccountUsername[];
}

export class Account {
	public writable: string[] = ['optInMarketing'];

	constructor(private jar: HttpService) { }

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
		token: string, name: string, opts: { tipsEnabled?: boolean, botEnabled?: boolean; noChannel?: boolean, optInMarketing?: boolean } = {},
	): Promise<ILoginToken> {
		return this.jar.post<ILoginToken>(`account/signup`, { signup: token, username: name, ...opts }).toPromise()
	}

	public getInvites(): Observable<IAccountInvite[]> {
		return this.jar.get<IAccountInvite[]>(`account/invites`);
	}

	public acceptInvite(invite: IAccountInvite): Observable<void> {
		return this.jar.patch<void>(`account/invites/${invite.id}`, {});
	}

	public deleteInvite(invite: IAccountInvite): Observable<void> {
		return this.jar.delete<void>(`account/invites/${invite.id}`);
	}

	public update(account: IAccount): Observable<IAccount> {
		return this.jar.patch<IAccount>(`account`, pick(account, this.writable));
	}

	public getUsernames(): Observable<IAccountUsernameState> {
		return this.jar.get<IAccountUsernameState>(`account/username`);
	}

	public updateUsername(username: IAccountUsername): Observable<void> {
		return this.jar.post<void>(`account/username`, { username: username.username });
	}
}
