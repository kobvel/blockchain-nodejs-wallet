import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AppService {
  constructor(private http: Http) { }

  getBlocks() {
    return this.http.get('http://localhost:8080/blocks').map(res => res.json());
  }
}
