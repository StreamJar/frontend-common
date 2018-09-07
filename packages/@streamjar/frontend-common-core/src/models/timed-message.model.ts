import { HttpService } from '../services/http.service';
import { BaseModel, Dated } from './base';

export interface ITimedMessage extends Dated {
	id?: number;
	message: string;
	platforms: string[];
}

export class TimedMessage extends BaseModel<ITimedMessage> {
	public writable: string[] = ['message', 'platforms'];
	public endpoint = 'schedule';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
