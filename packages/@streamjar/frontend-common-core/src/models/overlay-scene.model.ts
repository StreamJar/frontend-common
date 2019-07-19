import { BaseModel, Dated, Identifiable } from './base';
import { IChannel } from './channel.model';
import { Observable } from 'rxjs';

export interface IOverlayScene extends Identifiable, Dated {
	color: 'transparent' | 'blue' | 'green';
	height: number;
	width: number;
	name: string;
	number: number;
	overlayScreenshot: string | null;
}

export class OverlayScene extends BaseModel<IOverlayScene> {
	public writable: string[] = ['color', 'width', 'height', 'name', 'sceneId', 'deleted']; // sceneId is a weird quirk of the api

	public endpoint = 'overlay/scenes';

	public update(channel: IChannel, scene: IOverlayScene & { deleted?: boolean }): Observable<IOverlayScene> {
		return super.update(channel, scene);
	}
}
