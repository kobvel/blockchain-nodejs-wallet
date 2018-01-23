import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { AppService } from 'app/app.service';
import { WalletComponent } from './wallet/wallet.component';
import CoinKey from 'coinkey'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  wallets: any[] = [];
  txs: any[] = [];
  sub: Subscription;
  interval: any;
  @ViewChildren('walletRef') private walletRefs: QueryList<WalletComponent>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.newWallet();

    this.interval = setInterval(() => {
      this.sub = this.appService.getTransactions().subscribe(txs => this.txs = txs);
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub && this.sub.unsubscribe();
  }

  newWallet() {
    const wallet = CoinKey.createRandom();
    wallet.hash = wallet.privateKey.toString('hex');
    wallet.balance = 0;
    this.wallets = [wallet, ...this.wallets];
  }

  sendCoins(event: { to: string, from: string, amount: number }) {
    this.appService.sendCoins(event.to, event.from, event.amount).subscribe(res => {

      // update balances if wallet was involved in the transfer
      Object.keys(this.wallets).forEach(address => {

      });

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
