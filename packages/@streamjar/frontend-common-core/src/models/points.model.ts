import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';
import { BaseModel, Dated} from './base';

export interface IPoints extends Dated {
	name: string;
	boostexpiry: number;

	gain: {
		message: { value: number; interval: number; };
		offline: { value: number; interval: number; };
		watch: { value: number; interval: number; };
		donate: { value: number };
		follow: { value: number };
		subscribe: { value: number };
		raffle: { value: number };
		death: { value: number };
	};

	multipliers: {
		sub: number;
	}
}

export class Points extends BaseModel<IPoints> {
	public writable: string[] = ['name', 'gain', 'multipliers', 'boostexpiry'];
	public endpoint = 'points';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public get(channel: IChannel): Observable<IPoints> {
		return this.jar.get<IPoints>(`channels/${channel.id}/${this.endpoint}`);
	}

	public update(channel: IChannel, obj: IPoints): Observable<IPoints> {
		return this.jar.patch<IPoints>(`channels/${channel.id}/${this.endpoint}`, this.fetchData(obj));
	}
}
