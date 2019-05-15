import { BaseModel, Dated, Identifiable } from './base';

export interface IOverlayScene extends Identifiable, Dated {
	color: 'transparent' | 'blue' | 'green';
	height: number;
	width: number;
	name: string;
	number: number;
	overlayScreenshot: string | null;
}

export class OverlayScene extends BaseModel<IOverlayScene> {
	public writable: string[] = ['color', 'width', 'height', 'name', 'sceneId']; // sceneId is a weird quirk of the api

	public endpoint = 'overlay/scenes';

}
