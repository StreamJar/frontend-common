import pick from 'lodash-es/pick';
import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { IChannel } from './channel.model';

export interface IWebsite {
	layout: ILayout;
	pages: IPage[];
}

export interface ILayout {
	colour: string;
	header: boolean;
	liveInfo: boolean;
	pattern: boolean;
}

export interface IPage {
	page: string;
	order: number;
	hidden: boolean;
}

export class Website {
	public static writable: string[] = ['pattern', 'liveInfo', 'colour'];

	constructor(private jar: HttpService) {}

	public get(channel: IChannel): Observable<IWebsite> {
		return this.jar.get<IWebsite>(`channels/${channel.id}/website`)
	}

	public getLayout(channel: IChannel): Observable<ILayout> {
		return this.jar.get<ILayout>(`channels/${channel.id}/website/layout`)
	}

	public saveLayout(channel: IChannel, layout: ILayout): Observable<ILayout> {
		return this.jar.patch<ILayout>(`channels/${channel.id}/website/layout`, pick(layout, Website.writable))
	}

	public getPages(channel: IChannel): Observable<IPage[]> {
		return this.jar.get<IPage[]>(`channels/${channel.id}/website/pages`)
	}

	public savePages(channel: IChannel, pages: IPage[]): Observable<IPage[]> {
		return this.jar.patch<IPage[]>(`channels/${channel.id}/website/pages`, { pages })
	}
}
