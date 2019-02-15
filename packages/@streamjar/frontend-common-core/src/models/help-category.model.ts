import { HttpService } from '@streamjar/frontend-common-core';
import { Observable } from 'rxjs';
import { pick } from '../utils';
import { Dated, Identifiable } from './base';

export interface IHelpCategory extends Identifiable, Dated {
	name: string;
	description: string;
	order: number;
	slug: string;
}

export class HelpCategory {
	constructor(private jar: HttpService) {}

	public getAll(): Observable<IHelpCategory[]> {
		return this.jar.get<IHelpCategory[]>('help/categories');
	}

	public create(data: { name: string; description: string }): Observable<IHelpCategory> {
		return this.jar.post<IHelpCategory>('help/categories', data);
	}

	public update(category: IHelpCategory): Observable<IHelpCategory> {
		return this.jar.patch<IHelpCategory>(`help/categories/${category.id}`, pick(category, ['name', 'description', 'order']));
	}

	public destroy(category: IHelpCategory): Observable<void> {
		return this.jar.delete<void>(`help/categories/${category.id}`);
	}
}
