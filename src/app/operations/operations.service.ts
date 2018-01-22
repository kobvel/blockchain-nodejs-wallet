import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OperationsService {
  constructor(private http: Http) {
  }

  getBlocks() {
    return this.http.get('http://192.168.99.100:3001/blocks').map(res => res.json());
  }

}
