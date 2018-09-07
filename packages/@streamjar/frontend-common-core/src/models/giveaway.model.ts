import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { IChannel } from './channel.model';

export interface IGiveawayWin {
	message?: string;
	key?: string;
	createdAt: string;
	updatedAt: string;
}

export class Giveaway {
	constructor(private jar: HttpService) {

	}

	public getWins(channel: IChannel): Observable<IGiveawayWin[]> {
		return this.jar.get<IGiveawayWin[]>(`channels/${channel.id}/giveaways/wins`);
	}
}
