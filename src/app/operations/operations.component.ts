import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-operations',
  templateUrl: 'operations.component.html',
  styleUrls: ['operations.component.scss']
})
export class OperationsComponent {
  @Input() transactions: any = [];
  constructor() { }
}
