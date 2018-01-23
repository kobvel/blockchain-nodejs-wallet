import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component } from '@angular/core';
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

  @Input() hashDictionary = {};

  constructor(private opService: OperationsService) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.sub = this.opService.getTransactions().subscribe(transactions => {
        this.transactions = transactions;
      });
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub && this.sub.unsubscribe();
  }
}
