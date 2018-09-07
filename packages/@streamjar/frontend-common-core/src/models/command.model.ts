import { HttpService } from '../services/http.service';
import { BaseModel} from './base';

export interface ICommand {
	name?: string;
	aliases?: string[];
	arguments?: number;
	description?: string;
	enabled?: boolean;
	fallback?: string;
	lang?: any;
	level?: string[];
	module?: string;
	usage?: string;
	cost?: number;
}

export class Command extends BaseModel<ICommand> {
	public writable: string[] = ['cost', 'level', 'enabled'];
	public endpoint = 'commands';

	protected getId(data: ICommand) {
		return data.name;
	}

	constructor(protected jar: HttpService) {
		super(jar);
	}
}
