import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OperationsService {
  constructor(private http: Http) {
  }

  getBlocks() {
    return this.http.get('http://localhost:8080/blocks').map(res => res.json());
  }
}
