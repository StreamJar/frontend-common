import { Observable } from 'rxjs';

import { HttpService } from '../services';
import { pick } from '../utils';
import { Dated, Identifiable } from './base';

export interface IHelpArticleSummary extends Identifiable, Dated {
	title: string;
	summary: string;
	categoryId: number;
	slug: string;
	user: {
		username: string;
		avatar: string;
		role: string;
	}
}

export interface IHelpArticle extends IHelpArticleSummary {
	body: string;
}

export interface IHelpArticleSearch {
	slug: string;
	title: string;
}

export class HelpArticle {
	constructor(private jar: HttpService) {}

	public getAll(category: number): Observable<IHelpArticleSummary[]> {
		return this.jar.get<IHelpArticleSummary[]>(`help/articles?category=${category}`);
	}

	public create(data: { title: string; body: string; categoryId: number }): Observable<IHelpArticle> {
		return this.jar.post<IHelpArticle>('help/articles', data);
	}

	public getOne(id: number): Observable<IHelpArticle> {
		return this.jar.get<IHelpArticle>(`help/articles/${id}`);
	}

	public update(article: IHelpArticle): Observable<IHelpArticle> {
		return this.jar.patch<IHelpArticle>(`help/articles/${article.id}`, pick(article, ['title', 'body']));
	}

	public destroy(article: IHelpArticle): Observable<void> {
		return this.jar.delete<void>(`help/articles/${article.id}`);
	}

	public search(query: string): Observable<IHelpArticleSearch[]> {
		return this.jar.get<IHelpArticle[]>(`help/articles/search?query=${query}`);
	}
}
