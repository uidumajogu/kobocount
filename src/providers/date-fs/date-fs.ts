import { Injectable } from '@angular/core';
import { format, startOfWeek, endOfWeek, subDays, addDays,
        addMonths, subMonths, addWeeks, subWeeks, addYears,
        subYears, getDaysInMonth, eachDay, differenceInDays} from 'date-fns';



@Injectable()
export class DateFsProvider {

  public dateNowFS: any;
  public dayNowFS: any;
  public weekNowFS: any;
  public monthNowFS: any;
  public yearNowFS: any;
  public yearMonthNowFS: any;
  public quarterNowFS: any;
  public dayNowSFS: any;


  constructor() {
    this.dateNowFS = format(new Date(), 'YYYY-MM-DD');
    this.dayNowFS = format(new Date(), 'DD');
    this.weekNowFS = format(new Date(), 'W');
    this.monthNowFS = format(new Date(), 'MM');
    this.yearNowFS = format(new Date(), 'YYYY');
    this.yearMonthNowFS = format(new Date(), 'YYYY') + "-" + format(new Date(), 'MM');
    this.quarterNowFS = "Q" + format(new Date(), 'Q');
    this.dayNowSFS = format(new Date(), 'YYYY, MM, DD');
  }

  yearSlct(d) {
    return format(new Date(d), 'YYYY');
  }

  yearMonthSlct(d) {
    var m = format(new Date(d), 'MM');
    var y = format(new Date(d), 'YYYY');
    return y + "-" + m;
  }

  monthSlct(d) {
    return format(new Date(d), 'MM');
  }

  weekSlct(d) {
    return format(new Date(d), 'W');
  }

  daySlct(d) {
    return format(new Date(d), 'YYYY-MM-DD');
  }

  daySlctS(d) {
    return format(new Date(d), 'DD');
  }

  wkDaySlctS(d) {
    return format(new Date(d), 'Do');
  }



  dayStrSlct(d) {
    return format(new Date(d), 'YYYY, MM, DD');
  }

  dateAdd(d, n) {
    return format(new Date(addDays(d, n)), 'YYYY, MM, DD');
  }

  dateSub(d, n) {
    return format(new Date(subDays(d, n)), 'YYYY, MM, DD');
  }

  monthAdd(d, n) {
    return format(new Date(addMonths(d, n)), 'YYYY, MM, DD');
  }

  monthSub(d, n) {
    return format(new Date(subMonths(d, n)), 'YYYY, MM, DD');
  }

  weekAdd(d, n) {
    return format(new Date(addWeeks(d, n)), 'YYYY, MM, DD');
  }

  weekSub(d, n) {
    return format(new Date(subWeeks(d, n)), 'YYYY, MM, DD');
  }

  yearAdd(d, n) {
    return format(new Date(addYears(d, n)), 'YYYY, MM, DD');
  }

  yearSub(d, n) {
    return format(new Date(subYears(d, n)), 'YYYY, MM, DD');
  }

  dateFullString(ds) {
    return format(new Date(ds), 'dddd, Do MMM YYYY');
  }


  dateYear(ds) {
    return format(new Date(ds), 'YYYY');
  }


  dateMonthYear(ds) {
    return format(new Date(ds), 'MMMM YYYY');
  }

  dateWeekRange(ds) {
    var weekStart = format(startOfWeek(new Date(ds), {weekStartsOn: 1}), 'Do MMM');
    var weekEnd = format(endOfWeek(new Date(ds), {weekStartsOn: 1}), 'Do MMM');
    return weekStart + " - " + weekEnd +  " " + format(new Date(ds), ', YYYY');
  }

  daysInMonth(ds) {
    return getDaysInMonth(new Date(ds));
  }

  startDayOfWeek (ds) {
    return format(new Date(startOfWeek(new Date(ds), {weekStartsOn: 1})), 'DD');
  }

  endDayOfWeek (ds) {
    return format(new Date(endOfWeek(new Date(ds), {weekStartsOn: 1})), 'DD');
  }


  startDateOfWeek (ds) {
    return format(new Date(startOfWeek(new Date(ds), {weekStartsOn: 1})), 'YYYY, MM, DD');
  }

  endDateOfWeek (ds) {
    return format(new Date(endOfWeek(new Date(ds), {weekStartsOn: 1})), 'YYYY, MM, DD');
  }

  daysInRange (ds, de) {
    return eachDay(new Date(ds), new Date(de))
  }

  daysDiff(d1, d2) {
    return differenceInDays(new Date(d1), new Date(d2))
  }

}
