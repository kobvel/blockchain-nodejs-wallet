import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OperationsService {
  constructor(private http: Http) {
  }

  getTransactions() {
    return this.http.get('http://localhost:8080/transactions')
      .map(res => res.json().reverse()); // reverse to show transactions from latest
  }
}
