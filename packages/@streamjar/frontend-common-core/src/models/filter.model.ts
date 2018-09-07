import { HttpService } from '../services/http.service';
import { BaseModel } from './base';

export interface IFilter {
	enabled: boolean;
	filter: string;
	value: number;
	lenth: number;
	punishment: 'none' | 'warn' | 'silent';
	words: string[] | string;
	ignored: string[] | string;
}

export class Filter extends BaseModel<IFilter> {
	public writable: string[] = ['enabled', 'punishment', 'value', 'length', 'words', 'ignored'];
	public endpoint = 'filter';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	protected getId(data: IFilter) {
		return data.filter;
	}
}
