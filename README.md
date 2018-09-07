# @streamjar/frontend-common
frontend-common is a shared library shared between our frontends ([frontend2](https://control.streamjar.tv), [usersite2](https://luke.streamjar.gg), [developers](https://developers.streamjar.io)) which aids in execution of HTTP requests and any other shared logic.

## [@streamjar/frontend-common-core](https://github.com/StreamJar/frontend-common/tree/master/packages/%40streamjar/frontend-common-core)
The core holds all of the logic which gets shared between platforms. Roughly speaking it contains:

- Models for all of our endpoints
- Access to metadata for bot commands
- Textual reasons for point values
- Documentation on the OAuth scopes we support.


Using modeling requires an instance of HttpService to be passed into the constructor. It's up to the client application to implement this. For instance, in Angular we provide a slim wrapper around their HttpClient (@streamjar/frontend-common-ng). 

## [@streamjar/frontend-common-ng](https://github.com/StreamJar/frontend-common/tree/master/packages/%40streamjar/frontend-common-ng)
This is a package designed to aid the use of modeling within Angular's DI. You must provide your own implementation of HttpService which is provided into Angular.

##### Using @streamjar/frontend-common-ng
```ts
import { NgModule } from '@angular/core';
import { HttpService } from '@streamjar/frontend-common-core';
import { FrontendCommonModule } from '@streamjar/frontend-common-ng';

@NgModule({
    imports: [
        ...
        FrontendCommonModule,
    ],
    providers: [
        { provide: HttpService, useClass: JarService },
    ]
})
export class AppModule {

}
```

##### Example HttpService
```ts
@Injectable()
export class JarService extends HttpService {
	constructor(private http: HttpClient) {
		super({
			endpoint: config.api.url,
			version: config.api.version,
		});
	}

	public get<T>(uri: string): Observable<T> {
		return this.http.get<T>(this.buildUrl(uri), { headers: this.getHeaders(uri) });
	}

	public post<T>(uri: string, body: any): Observable<T> {
		return this.http.post<T>(this.buildUrl(uri), body, { headers: this.getHeaders(uri) });
	}

	public patch<T>(uri: string, body: any): Observable<T> {
		return this.http.patch<T>(this.buildUrl(uri), body, { headers: this.getHeaders(uri) });
	}

	public put<T>(uri: string, body: any): Observable<T> {
		return this.http.put<T>(this.buildUrl(uri), body, { headers: this.getHeaders(uri) });
	}

	public delete<T>(uri: string): Observable<T> {
		return this.http.delete<T>(this.buildUrl(uri), { headers: this.getHeaders(uri) });
	}
}
```

## About
This is configured as a mono-repo, using [lerna](https://lernajs.io/). Publishing should not be done manually.