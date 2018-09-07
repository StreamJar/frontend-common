import { HttpService } from '../services/http.service';
import { BaseModel } from './base';
import { ITip } from './tip.model';

export interface ITipper {
	email: string;
	name: string;
	currency: string;
	count: number;
	average: string;
	sum: string;
	avatar: string;
	top: string;
	tips?: ITip[];
}

export class Tipper extends BaseModel<ITipper> {
	public static writable: string[] = [];
	public endpoint = 'tippers';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
