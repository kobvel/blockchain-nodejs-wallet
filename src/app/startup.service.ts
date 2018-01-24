import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StartupService {

  public hostData: string[] = null;

  constructor(private http: Http) { }

  load(): Promise<any> {
    return this.http
      .get('/hosts')
      .toPromise()
      .then((res: any) => this.hostData = res.json())
      .catch((err: any) => Promise.resolve());
  }

}
