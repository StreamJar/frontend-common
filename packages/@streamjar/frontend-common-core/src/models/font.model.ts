import { HttpService } from '../services/http.service';
import { BaseModel } from './base';

export interface IFont {
	id?: number;
	family: string;
	source: 'google' | 'custom';
	location: string | null;
}

export class Font extends BaseModel<IFont> {
	public static writable: string[] = [];
	public endpoint = 'fonts';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
