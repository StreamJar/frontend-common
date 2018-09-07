import { HttpService } from '../services/http.service';
import { BaseModel, BeforeUpdate, Dated } from './base';

export interface IPanelText {
	content: string;
}

export interface IPanelInput {
	type: 'name' | 'email' | 'message' | 'amount' | 'custom';
}

export interface IPanelAudioRecording {
	cost: number;
	length: number;
}

export interface IPanelTips {
	type: 'top' | 'recent';
}

export type PanelType = 'text' | 'input' | 'music' | 'audioRecording' | 'goal' | 'minecraft' | 'tips' | 'button';
export type PanelSetting = IPanelText | IPanelInput | IPanelAudioRecording | IPanelTips | {};

export interface IPanel extends Dated {
	id?: number,
	column: number,
	row: number,
	width: number,
	height: number,
	minimumAmount: number,
	name: string,
	data: PanelSetting,
	page: 'tips',
	type: PanelType,
}

export class Panel extends BaseModel<IPanel> implements BeforeUpdate<IPanel> {
	public writable: string[] = ['name', 'data', 'row', 'column', 'width', 'height', 'minimumAmount', 'type'];
	public endpoint = 'panels';

	constructor(protected jar: HttpService) {
		super(jar);
	}

	public beforeUpdate(panel: IPanel): IPanel {
		delete panel.type;

		return panel;
	}
}
