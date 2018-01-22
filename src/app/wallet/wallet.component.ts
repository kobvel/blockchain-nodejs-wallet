import { AppService } from '../app.service';
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls: ['wallet.component.scss']
})
export class WalletComponent {
  @Input() wallet = null;

  constructor(private apiService: AppService) {

  }
  mine() {
    this.apiService.mineBlocks(this.wallet.hash).subscribe(res => {
      console.log(res);
    });
  }

  updateBalance() {
    this.apiService.getBalance(this.wallet.hash).subscribe(balance => {
      console.log(balance);
    });
  }
}
