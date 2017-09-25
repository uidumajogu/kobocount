import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'ObjToArr',
})
export class ObjToArrPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
  }

  // transform(value: any, args: string): any {
  //   if (args === "len") {
  //     return Object.keys(value).length;
  //   } else {
  //     return Object.keys(value);//.map(key => value[key]);
  //   }
  // }
}
