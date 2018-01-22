import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component } from '@angular/core';
import { OperationsService } from './operations.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'app-operations',
  templateUrl: 'operations.component.html',
  styleUrls: ['operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {
  blocks: any = [];
  sub: Subscription;
  interval: any;
  constructor(private opService: OperationsService) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.sub = this.opService.getBlocks().subscribe(blocks => {
        this.blocks = blocks
      });
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub && this.sub.unsubscribe();
  }
}
