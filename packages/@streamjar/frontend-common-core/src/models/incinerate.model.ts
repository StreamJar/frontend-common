import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';

export interface IIncineratorExport {
	exportedAt: string;
    exportedIp: string;
    exportedUa: string;
    expiresAt?: string;
    cdnUrl?: string;
}

export interface IIncineratorState {
    active: boolean;
    gracePeriod: number;
    activeSince?: string;
    destroyAfter?: string;
    cancelToken?: string;
}

export interface IIncineratorRequestResponse {
    expiresAt: string;
    cancelToken: string;
}

export class Incinerate {
	constructor(private jar: HttpService) {}

	public getExports(): Observable<IIncineratorExport[]> {
		return this.jar.get<IIncineratorExport[]>(`account/incinerate/export`);
	}

	public requestExport(): Observable<IIncineratorExport> {
		return this.jar.post<IIncineratorExport>(`account/incinerate/export`, {});
	}

	public getIncinerationState(): Observable<IIncineratorState> {
		return this.jar.get<IIncineratorState>(`account/incinerate/destroy`);
	}

	public requestIncineration(): Observable<IIncineratorRequestResponse> {
		return this.jar.post<IIncineratorRequestResponse>(`account/incinerate/destroy`, {});
	}

	public cancelIncineration(userId: number, cancelToken: string): Observable<void> {
		return this.jar.delete<void>(`account/incinerate/destroy/${userId}/${cancelToken}`);
	}
}
