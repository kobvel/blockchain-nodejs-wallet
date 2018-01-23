import { AppService } from '../app.service';
import { Component, Input, Inject } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls: ['wallet.component.scss']
})
export class WalletComponent {
  @Input() wallet = null;
  balance = 0;
  sendObj: { to: string, amount: number } = { to: '', amount: 1 };

  constructor(private apiService: AppService, @Inject('Hashwords') public hashwords: any) {

  }
  mine() {
    this.apiService.mineBlocks(this.wallet.hash).subscribe(res => {
      this.updateBalance();
    });
  }

  updateBalance() {
    this.apiService.getBalance(this.wallet.hash).subscribe(balance => this.balance = balance);
  }

  sendCoins(form) {
    if (form.valid) {
      this.apiService.sendCoins(form.value.to, this.wallet.hash, form.value.amount)
        .subscribe(res => {
          this.updateBalance();
        });
    } else {
      alert('Something wrong with the form!');
    }
  }
}
