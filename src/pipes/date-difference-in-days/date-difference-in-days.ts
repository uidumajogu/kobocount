import { Pipe, PipeTransform } from '@angular/core';
import {DateFsProvider} from "../../providers/date-fs/date-fs";


@Pipe({
  name: 'differenceInDays',
})
export class DateDifferenceInDaysPipe implements PipeTransform {

  constructor(public dfs: DateFsProvider) {
  }

  transform(d1: any, d2: any) {
    var days = this.dfs.daysDiff(d2, d1);

    if (days === 0){
      return "Today";
    } else {
      return days + " days";
    }
  }
}
