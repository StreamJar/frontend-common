import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services';


// tslint:disable
const keys = (i) => Object.keys(i).map(j => i[j]);

export interface IDocumentationCategory {
	name: string;
	groups: IDocumentationGroup[];
	models: { [key: string]: any };
}

export interface IDocumentationResponse {
	statusCode: number;
	body: any;
}

export interface IDocumentationGroup {
	name: string;
	endpoints: IDocumentationEndpoint[];
	internal: boolean;
}

export interface IDocumentationParam {
	name: string;
	enumValue: boolean;
	defaultValue?: string;
	values?: string[];
	kind: string;
	optional: boolean;
	description: string;
}

export interface IDocumentationEndpoint {
	method: string;
	name: string;
	url: { value: string, type: string }[],
	urlParams: IDocumentationParam[],
	queryParams: IDocumentationParam[],
	bodyParams: IDocumentationParam[],
	description: string;
	scope: string | null;
	internal: boolean;
	responses: IDocumentationResponse[]
}

export class ApiDocs {
	constructor(protected jar: HttpService) {
	}

	public getDocumentation(): Observable<IDocumentationCategory[]> {
		return this.jar.get('docs?format=jar')
			.pipe(map(value => this.getCategories(value)));
	}

	private getHostname(data): string {
		return `${data.baseEndpoint}v2`;
	}

	private getCategories(data): IDocumentationCategory[] {
		return data.groups.map(g => {
			return {
				name: g.name,
				models: g.models,
				groups: this.getGroups(this.getHostname(data), g, g.models),
			}
		});
	}

	private getGroups(baseUrl: string, data: any, models: { [key: string]: any }): IDocumentationGroup[] {
		return data.resources.map(c => {
			return {
				name: c.name,
				internal: c.internal,
				endpoints: keys(c.methods).map(ref => this.getEndpoint(baseUrl, ref, c.endpoint, models)),
			};	
		});
	}

	private getEndpoint(baseUrl: string, i, url: string, models: { [key: string]: any }): IDocumentationEndpoint {
		return <IDocumentationEndpoint>{
			bodyParams: this.getParams(i.payload),
			description: i.description,
			method: i.method,
			name: i.name,
			responses: this.getResponses(i.responses, models),
			scope: i.scope,
			internal: i.internal,
			url: [
				{ value: baseUrl, type: 'string' },
				...`${url}${i.endpoint}`.split(/({.*?})/).filter(a => !!a).map(a => ({
					type: new RegExp(/({.*?})/).test(a) ? 'variable' : 'string',
					value: a,
				})).filter(a => !!a.value),
			],
			urlParams: this.getParams(i.params),
			queryParams: this.getParams(i.query),
		};
	}

	private getResponses(content, models: { [key: string]: any }): IDocumentationResponse[] {
		return content
			.map(i => ({
				body: i.kind === 'model' ? models[i.value] : i.value,
				statusCode: +i.name,
			}));
	}

	private getParams(params: any): IDocumentationParam[] {
		return keys(params);
	}
}