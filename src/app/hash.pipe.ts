import { Pipe, PipeTransform, Inject } from '@angular/core';

@Pipe({ name: 'hashname' })
export class HashNamePipe implements PipeTransform {
  constructor( @Inject('Hashwords') public hashwords: any) { }

  transform(value: any): any {
    return value.length > 20 ? this.hashwords.hashStr(value) : value;
  }
}
