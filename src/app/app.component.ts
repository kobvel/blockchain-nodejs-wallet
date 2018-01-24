import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'app/app.service';
import { StartupService } from 'app/startup.service';
import * as CoinKey from 'coinkey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  wallets: any[] = [];
  txs: any[] = [];
  sub: Subscription;
  error = false;
  hosts: string[] = [];
  selectedHost = this.appService.selectedHost;
  walletFilter = '';
  interval: any;

  constructor(
    public appService: AppService,
    private startupService: StartupService) { }

  ngOnInit() {
    if (!this.startupService.hostData) {
      this.error = true;
    } else {
      this.newWallet();
      this.hosts = this.appService.hosts;
      this.selectedHost = this.appService.selectedHost;

      this.interval = setInterval(() => {
        this.sub = this.appService.getTransactions().subscribe(txs => {
          this.txs = txs.filter(tx => {
            const bothAddresses = tx.from + tx.to;
            return !this.walletFilter || bothAddresses.includes(this.walletFilter);
          });
        });
      }, 1000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub && this.sub.unsubscribe();
  }

  onHostChange(newHost) {
    this.appService.selectedHost = newHost;
  }

  newWallet() {
    const wallet = CoinKey.createRandom();
    wallet.hash = wallet.privateKey.toString('hex');
    wallet.balance = 0;
    this.wallets = [wallet, ...this.wallets];
  }

  sendCoins(event: { to: string, from: string, amount: number }) {
    this.appService.sendCoins(event.to, event.from, event.amount).subscribe(res => {

      this.wallets.forEach(wallet => {
        const address = wallet.hash;
        if (address === res.from || address === res.to) {
          this.updateBalance(wallet.hash);
        }
      });

    });
  }

  mineCoins(address: string) {
    this.appService.mineBlocks(address).subscribe(res => {
      this.updateBalance(address);
    });
  }

  updateBalance(address: string) {
    this.appService.getBalance(address).subscribe(balance => {
      const wallet = this.wallets.find(wal => wal.hash === address);
      wallet.balance = balance;
    });
  }

}
