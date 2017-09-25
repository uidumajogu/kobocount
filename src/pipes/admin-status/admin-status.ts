import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'adminStatus',
})
export class AdminStatusPipe implements PipeTransform {


  transform(value: string, ...args) {

    if (value === "true") {
      return "Admin";
    } else {
      return "User";
    }

  }
}
