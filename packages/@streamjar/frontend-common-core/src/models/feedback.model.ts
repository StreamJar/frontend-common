import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import { BaseModel, Dated, Identifiable } from './base';

export interface IFeedbackItem extends Dated, Identifiable {
	title: string;
	content: string;
	votes: number;
	status: string;
	tag: string;
	slug: string;
	comments: number;
	user: IFeedbackUser;
	pinnedComment: IFeedbackComment;
	vote: {
		value: number;
		notify: boolean;
	} | null
}

export interface IFeedbackUser {
	username: string;
	avatar: string;
	role: string;
}

export interface IFeedbackComment extends Identifiable, Dated {
	content: string;
	status: string | null;
	user: IFeedbackUser;
}

export interface IFeedbackTag extends Dated {
	name: string;
	title: string;
	color: string;
}

export interface IFeedbackStatus {
	name: string;
}

export class Feedback {
	constructor(private jar: HttpService) {}

	public getAll(filter: { status?: string; tag?: string; order?: string }): Observable<IFeedbackItem[]> {
		return this.jar.get<IFeedbackItem[]>(`feedback${BaseModel.query(filter)}`);
	}

	public getOne(id: number): Observable<IFeedbackItem> {
		return this.jar.get<IFeedbackItem>(`feedback/${id}`);
	}

	public myVotes(): Observable<IFeedbackItem[]> {
		return this.jar.get<IFeedbackItem[]>(`feedback/me`);
	}

	public create(data: { title: string; content: string; tag: string; }): Observable<IFeedbackItem> {
		return this.jar.post<IFeedbackItem>(`feedback`, data);
	}

	public vote(item: IFeedbackItem, value: 1 | 0 | -1, notify?: boolean): Observable<{ votes: number; notify: boolean }> {
		const request: any = { value }; // tslint:disable-line

		if (notify !== undefined) {
			request.notify = notify;
		}

		return this.jar.put<{ votes: number; notify: boolean }>(`feedback/${item.id}/votes`, request);
	}

	public getTags(): Observable<IFeedbackTag[]> {
		return this.jar.get<IFeedbackTag[]>(`feedback/tags`);
	}

	public getStatuses(): Observable<IFeedbackStatus[]> {
		return this.jar.get<IFeedbackTag[]>(`feedback/statuses`);
	}

	public getComments(item: IFeedbackItem): Observable<IFeedbackComment[]> {
		return this.jar.get<IFeedbackComment[]>(`feedback/${item.id}/comments`);
	}

	public addComment(
		item: IFeedbackItem, content: string, meta: { notify?: boolean; status?: string; pin?: boolean } = {},
	): Observable<IFeedbackComment> {
		return this.jar.post<IFeedbackComment>(`feedback/${item.id}/comments`, { content, ...meta });
	}

	public pinComment(item: IFeedbackItem, comment: IFeedbackComment): Observable<void> {
		return this.jar.post<void>(`feedback/${item.id}/comments/${comment.id}/pin`, {});
	}

	public destroyComment(item: IFeedbackItem, comment: IFeedbackComment): Observable<void> {
		return this.jar.delete<void>(`feedback/${item.id}/comments/${comment.id}`);
	}
}
