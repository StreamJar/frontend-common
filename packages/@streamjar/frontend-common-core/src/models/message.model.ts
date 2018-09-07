import { HttpService } from '../services/http.service';
import { BaseModel, Dated } from './base';

export interface IMessage extends Dated {
	id?: number;
	name?: string;
	content?: string;
	platforms?: string[];
	recipient?: boolean;
}

export class Message extends BaseModel<IMessage> {
	public writable: string[] = ['name', 'content', 'platforms', 'recipient'];
	public endpoint = 'messages';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
