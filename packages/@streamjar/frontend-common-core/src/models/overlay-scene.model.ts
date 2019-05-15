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
	public writable: string[] = ['color', 'width', 'height', 'name' ];

	public endpoint = 'overlay/scenes';

}
