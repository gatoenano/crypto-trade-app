// core
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, args?: any): Array<any> {
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return 1;
      } else if (a[args] === b[args]) {
        if (a.id < b.id) {
          return 1;
        }
      }

      return 0;
    });

    return array;
  }

}
