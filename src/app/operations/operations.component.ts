import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, Inject } from '@angular/core';
import { OperationsService } from './operations.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-operations',
  templateUrl: 'operations.component.html',
  styleUrls: ['operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {
  transactions: any = [];
  sub: Subscription;
  interval: any;

  constructor(private opService: OperationsService, @Inject('Hashwords') private hashwords: any) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.sub = this.opService.getTransactions().subscribe(transactions => {
        this.transactions = transactions.map(tx => {
          if (tx.from.length > 20) { tx.from = this.hashwords.hashStr(tx.from); }
          if (tx.to.length > 20) { tx.to = this.hashwords.hashStr(tx.to); }
          return tx;
        });
        this.transactions.map(tx => console.log())
      });
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub && this.sub.unsubscribe();
  }
}
