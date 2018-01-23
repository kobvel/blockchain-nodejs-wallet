import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map'


@Injectable()
export class AppService {
  hosts: string[] = [];
  selectedHost = ''
  constructor(private http: Http) {
    this.hosts = environment.peers.split(';');
    this.selectedHost = this.hosts[0];
  }

  /**
   * @param  {string} address hash address of the wallet
   */
  mineBlocks(address: string) {
    return this.http.post(`${this.selectedHost}/mine`, { wallet: address }).map(res => res.json());
  }

  /**
   * @param  {string} address hash address of the wallet
   */
  getBalance(address: string) {
    return this.http.get(`${this.selectedHost}/balance/${address}`).map(res => res.json());
  }

  sendCoins(to: string, from: string, amount: number) {
    return this.http.post(`${this.selectedHost}/transfer`, { to, from, amount }).map(res => res.json());
  }

  getTransactions() {
    return this.http.get(`${this.selectedHost}/transactions`)
      .map(res => res.json().reverse()); // reverse to show transactions from latest
  }
}
