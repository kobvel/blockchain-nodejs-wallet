import { Http } from '@angular/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class StartupService {

  public hostData: string[] = null;

  constructor(private http: Http) { }

  load(): Promise<any> {
    if (isDevMode) {
      // for the local development
      this.hostData = ['http://localhost:8080'];
      return Promise.resolve(true);
    } {
      return this.http.get('/hosts').toPromise()
        .then((res: any) => this.hostData = res.json())
        .catch((err: any) => Promise.resolve());
    }

  }

}
