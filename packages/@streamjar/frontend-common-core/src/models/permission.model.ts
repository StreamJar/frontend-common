import { HttpService } from '../services/http.service';
import { BaseModel, Dated } from './base';

export interface IPermission extends Dated {
	id: number;
	name: string;
	avatar: string;
	scopes: string[];
}

export class Permission extends BaseModel<IPermission> {
	public writable: string[] = ['scopes'];
	public endpoint = 'permissions';

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
