import { HttpService } from '../services/http.service';
import { BaseModel } from './base';

export interface IGoogleFont {
	family: string;
	source: string;
}

export class Font extends BaseModel<IGoogleFont> {
	public static writable: string[] = [];
	public endpoint = 'overlay2/fonts';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
