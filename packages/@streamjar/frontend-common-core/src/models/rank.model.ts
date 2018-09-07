import { HttpService } from '../services/http.service';
import { BaseModel, Dated} from './base';

export interface IRank extends Dated {
	id?: number;
	name: string;
	hours: number;
}

export class Rank extends BaseModel<IRank> {
	public writable: string[] = ['name', 'hours'];
	public endpoint = 'ranks';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
