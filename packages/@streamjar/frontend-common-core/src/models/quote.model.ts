import { HttpService } from '../services/http.service';
import { BaseModel, Dated} from './base';

export interface IQuote extends Dated {
	id?: number;
	number: number;
	message: string;
	person: string;
}

export class Quote extends BaseModel<IQuote> {
	public writable: string[] = ['message', 'person'];
	public endpoint = 'quotes';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
