import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services';

export interface IDocumentationCategory {
	name: string;
	groups: IDocumentationGroup[];
}

export interface IDocumentationGroup {
	name: string;
	endpoints: IDocumentationEndpoint[];
}

export interface IDocumentationParam {
	required: boolean;
	key: string;
	description: string;
	value: {
		type: string;
		value: string | string[];
	}
}

export interface IDocumentationEndpoint {
	name: string;
	url: { value: string, type: string }[],
	urlParams: IDocumentationParam[],
	bodyParams: IDocumentationParam[],
	description: string;
	scope: string | null;
}

export class ApiDocs {
	constructor(protected jar: HttpService) {
	}

	public getDocumentation(): Observable<IDocumentationCategory[]> {
		return this.jar.get('docs?format=json')
			.pipe(
				map(value => this.getCategories(value)),
			)
	}

	private getHostname(data): string {
		return data.content[0].attributes.meta.find(i => {
			return i.content.key.content === 'HOST';
		}).content.value.content;
	}

	private getCategories(data): IDocumentationCategory[] {
		return data.content[0].content.map(g => {
			return {
				groups: this.getGroups(this.getHostname(data), g.content),
				name: g.meta.title,
			}
		});
	}

	private getGroups(baseUrl: string, data: any): IDocumentationGroup[] {
		return data.map(c => {
			return {
				endpoints: c.content.map(ref => this.getEndpoint(baseUrl, ref, c.attributes.href)),
				name: c.meta.title,
			};
		});
	}

	private getEndpoint(baseUrl: string, i, url: string): IDocumentationEndpoint {
		const description: string = this.getElement(i.content, 'copy').content
		const scope = description.match(new RegExp(/\*Required authentication scope:\* `([a-zA-Z0-0:\(\)]+)`/));

        return {
            bodyParams: this.getParams(i.attributes && i.attributes.data ? i.attributes.data.content[0].content : []),
            description: description.replace(new RegExp(/\n\n\*Required authentication scope:\* `([a-zA-Z0-0:\(\)]+)`/), ''),
            name: i.meta.title,
            scope: scope ? scope[1] : null,
            url: [
                { value: baseUrl, type: 'string' },
                ...url.split(/({.*?})/).filter(a => !!a).map(a => ({
                    type: new RegExp(/({.*?})/).test(a) ? 'variable' : 'string',
                    value: a,
                })).filter(a => !!a.value),
            ],
            urlParams: this.getParams(i.attribute && i.attributes.hrefVariables ? i.attributes.hrefVariables.content : []),
        };
	}

	private getElement(arr, val) {
		return arr.find(i => i.element === val);
	}

	private getParams(params: any[]): IDocumentationParam[] {
		return <any>params.map(param => {
			if (!param.meta || !param.content.key.content) {
				return null;
			}

			return <IDocumentationParam>{
				description: param.meta.description,
				key: param.content.key.content,
				required: (param.attributes && param.attributes.typeAttributes || []).includes('required'),
				value: {
					type: param.content.value.element,
					value: Array.isArray(param.content.value.content) ? param.content.value.content.map(i => i.content) : param.content.value.content,
				},
			};
		}).filter(i => i !== null);
	}
}
