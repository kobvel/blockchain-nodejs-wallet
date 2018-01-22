import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppService } from 'app/app.service';
import CoinKey from 'coinkey'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  wallets: any = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.newWallet();
  }
  newWallet() {
    const newKey = CoinKey.createRandom();
    newKey.hash = newKey.privateKey.toString('hex');
    this.wallets.push(newKey);
    console.log(this.wallets);
  }
}
