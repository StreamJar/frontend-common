import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel } from './base';
import { IChannel } from './channel.model';

export interface IBoost {
	name: string;
	cost: number;
	multiplier: number;
}

export class Boost extends BaseModel<IBoost> {
	public writable: string[] = ['name', 'cost', 'multiplier'];
	public endpoint = 'points/boosts';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	protected getId(data: IBoost) {
		return data.name;
	}

	public update(channel: IChannel, obj: IBoost): Observable<IBoost> {
		return this.jar.put<IBoost>(`channels/${channel.id}/${this.endpoint}/${this.getId(obj)}`, this.fetchData(obj))
	}
}
