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
  hashDictionary = {
    d6656d585dfea0b12c9a3a332d0d50bd8b4d7fb5adcd6f82d92bab7158dc3dd3: 'miner server'
  };

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.newWallet();
  }
  newWallet() {
    const newKey = CoinKey.createRandom();
    newKey.hash = newKey.privateKey.toString('hex');
    newKey.name = 'Wallet #' + this.wallets.length;
    this.hashDictionary[newKey.hash] = newKey.name;
    this.wallets.push(newKey);
  }
}
