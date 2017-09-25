import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'anyToNumber',
})
export class AnyToNumberPipe implements PipeTransform {

  transform(value: string, ...args) {
    let retNumber = Number(value);
    return isNaN(retNumber) ? 0 : retNumber;
  }
}
