import { HttpService } from '../services/http.service';
import { BaseModel, BeforeUpdate, BeforeWrite, Dated } from './base';

export interface IGoal extends Dated {
	id?: number;
	name: string;
	type: string;
	current: number;
	total: number;
	platforms: string[];
	order?: number;
	mode: 'synced' | 'custom';
	completed?: boolean;
}

export interface ICreatableGoal {
	type: string;
	current?: number;
	total: number;
	platforms: string[];
	order?: number;
	mode: 'synced' | 'custom';
}

export class Goal extends BaseModel<IGoal> implements BeforeWrite<IGoal>, BeforeUpdate<IGoal> {
	public writable: string[] = ['mode', 'name', 'platforms', 'total', 'type', 'current', 'order'];
	public endpoint = 'goals';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public beforeHook(goal: IGoal): IGoal {
		const cGoal = { ...goal };

		if (goal.current === null || goal.mode === 'synced') {
			delete cGoal.current;
		}

		if (goal.type === 'tips' || goal.type === 'charity') {
			delete cGoal.platforms;
		}

		return cGoal;
	}

	public beforeUpdate(goal: IGoal): IGoal {
		delete goal.type;

		return goal;
	}
}
