import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AppService {
  constructor(private http: Http) { }

  /**
   * @param  {string} address hash address of the wallet
   */
  mineBlocks(address: string) {
    return this.http.post('http://localhost:8080/mine', { wallet: address }).map(res => res.json());
  }

  /**
   * @param  {string} address hash address of the wallet
   */
  getBalance(address: string) {
    return this.http.get(`http://localhost:8080/balance/${address}`).map(res => res.json());
  }
}
