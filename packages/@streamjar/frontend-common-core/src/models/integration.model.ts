import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { Dated } from './base';
import { IChannel } from './channel.model';

export interface IIntegration extends Dated {
	id: number;
	name: string;
	type: string;
	settings: any;
}

export interface IIntegrationUrl {
	url: string;
}

export interface IOAuthConfig {
	oauth_verifier?: string;
	oauth_token?: string;

	code?: string;
	state?: string;

	type: string;
}

export interface ITiltifyCampaign {
	id: number;
	name: string;
}

export interface ISpotifySong {
	status: boolean;
	source?: string;
	id?: string;
	artist?: string;
	name?: string;
	artwork?: string;
}

export interface ITwitterConfiguration {
	liveMessage: string;
	followerMessage: string;
	subscriberMessage: string;
	enabled: string[];
}

export interface ITwitter extends IIntegration {
	settings: ITwitterConfiguration;
}

export interface IDonorDriveConfiguration {
	charityId: string;
	participantId: number;
}

export interface IDonorDrive extends IIntegration {
	settings: IDonorDriveConfiguration;
}

export interface IDonorDriveCharity {
	id: string;
	name: string;
}

export interface IDonorDriveParticipant {
	participantId: number;
	name: string;
}

export class Integration {
	constructor(private jar: HttpService) {}

	public getAll(channel: IChannel): Observable<IIntegration[]> {
		return this.jar.get<IIntegration[]>(`channels/${channel.id}/integrations`);
	}

	public post(channel: number, data: IOAuthConfig): Observable<void> {
		return this.jar.post<void>(`channels/${channel}/integrations`, data);
	}

	public get(channel: IChannel, type: string): Observable<IIntegration> {
		return this.jar.get<IIntegration>(`channels/${channel.id}/integrations/${type}`);
	}

	public getUrl(channel: IChannel, type: string): Observable<IIntegrationUrl> {
		return this.jar.get<IIntegrationUrl>(`channels/${channel.id}/integrations/${type}/url`);
	}

	public delete(channel: IChannel, service: IIntegration): Observable<void> {
		return this.jar.delete<void>(`channels/${channel.id}/integrations/${service.type}`);
	}

	/**
	 * Tiltify Config
	 */

	public getTiltifyCampaigns(channel: IChannel): Observable<ITiltifyCampaign[]> {
		return this.jar.get<ITiltifyCampaign[]>(`channels/${channel.id}/integrations/tiltify/campaigns`)
	}

	public setTiltifyConfiguration(channel: IChannel, campaignId: number): Observable<void> {
		return this.jar.put<void>(`channels/${channel.id}/integrations/tiltify`, { campaignId })
	}

	/**
	 * Spotify Config
	 */

	public pingSpotify(channel: IChannel): Observable<ISpotifySong> {
		return this.jar.get<ISpotifySong>(`channels/${channel.id}/integrations/spotify/ping`);
	}

	/*
	* Twitter Config
	*/

	public getTwitter(channel: IChannel): Observable<ITwitter> {
		return this.jar.get<ITwitter>(`channels/${channel.id}/integrations/twitter`)
	}

	public setTwitterConfiguration(channel: IChannel, cfg: ITwitterConfiguration): Observable<void> {
		return this.jar.put<void>(`channels/${channel.id}/integrations/twitter`, cfg)
	}

	/*
	* DonorDrive Config
	*/
	public getDonorDriveCharities(channel: IChannel): Observable<IDonorDriveCharity[]> {
		return this.jar.get<IDonorDriveCharity[]>(`channels/${channel.id}/integrations/donordrive/charities`)
	}

	public getDonorDriveParticipant(channel: IChannel, charityId: string, participantId: string): Observable<IDonorDriveParticipant> {
		return this.jar.get<IDonorDriveParticipant>(
			`channels/${channel.id}/integrations/donordrive/participant?charityId=${charityId}&participantId=${participantId}`,
		);
	}

	public getDonorDrive(channel: IChannel): Observable<IDonorDrive> {
		return this.jar.get<IDonorDrive>(`channels/${channel.id}/integrations/donordrive`)
	}

	public setDonorDriveConfiguration(channel: IChannel, cfg: IDonorDriveConfiguration): Observable<void> {
		return this.jar.put<void>(`channels/${channel.id}/integrations/donordrive`, cfg)
	}
}
