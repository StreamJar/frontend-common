import { Observable } from 'rxjs';

import { IChannel } from '../models';
import { HttpService } from '../services/http.service';
import { BaseModel } from './base';

export interface IWarning {
	warnings: number;
	duration: number;
	type: 'minutes' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | null,
}

export class Warning extends BaseModel<IWarning> {
	public writable: string[] = ['duration', 'type'];
	public endpoint = 'warnings';

	public getId(data: IWarning) {
		return data.warnings;
	}

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public update(channel: IChannel, obj: IWarning): Observable<IWarning> {
		return this.jar.put<IWarning>(`channels/${channel.id}/${this.endpoint}/${this.getId(obj)}`, this.fetchData(obj))
	}
}
