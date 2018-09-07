import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { IChannel } from './channel.model';

export interface ITwitterURLs {
	auth: string;
}

export class Twitter {
	constructor(private jar: HttpService) {}

	public link(channelId: number, oauthToken: string, oauthVerifier: string): Promise<Object> {
		const data = { oauth_token: oauthToken, oauth_verifier: oauthVerifier };

		return this.jar.post(`channels/${channelId}/twitter`, data).toPromise();
	}

	public get(channel: IChannel): Observable<ITwitterURLs> {
		return this.jar.get<ITwitterURLs>(`channels/${channel.id}/twitter`)
	}

	public unlink(channel: IChannel): Promise<Object> {
		return this.jar.delete(`channels/${channel.id}/twitter`).toPromise();
	}
}
