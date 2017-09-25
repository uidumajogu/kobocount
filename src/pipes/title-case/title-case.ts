import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args) {

    if (!value) {
      return '';
    } else {
      return value.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
    }
  }
}
