import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pure',
  standalone: true,
})
export class PurePipe implements PipeTransform {
  transform(pureFunction: (...args: unknown[]) => unknown, ...args: unknown[]) {
    return pureFunction(...args);
  }
}
