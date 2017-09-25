import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tpc',
})
export class TransactionPaidConverterPipe implements PipeTransform {

  transform(value: string, ...args) {

    if (!value) {
      return '';
    } else {
      if (value === "YES") {
        return "Fully Paid";
      } else {
        if (value === "NO") {
          return "Not Paid";
        } else {
          if (value === "PARTIAL") {
            return "Partially Paid";
          } else {
            return "";
          }
        }
      }
    }
  }
}
