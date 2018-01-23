import { Component } from '@angular/core';
import { OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppService } from 'app/app.service';
import { WalletComponent } from './wallet/wallet.component';
import CoinKey from 'coinkey'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  wallets: any = [];
  @ViewChildren('walletRef') private walletRefs: QueryList<WalletComponent>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.newWallet();

  }
  newWallet() {
    const wallet = CoinKey.createRandom();
    wallet.hash = wallet.privateKey.toString('hex');
    this.wallets = [wallet, ...this.wallets];
  }

  sendCoins(event: { to: string, from: string, amount: number }) {
    this.appService.sendCoins(event.to, event.from, event.amount).subscribe(res => {

      // update balances if wallet was involved in the transfer
      this.walletRefs.forEach(el => {
        const address = el.wallet.hash;

        if (address === res.from || address === res.to) {
          el.updateBalance();
        }
      });

    });
  }
}
