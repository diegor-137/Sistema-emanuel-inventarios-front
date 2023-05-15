import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nophoto'
})
export class NophotoPipe implements PipeTransform {

  transform(foto: any): string {
    const nophoto = './assets/nofoto.png'
    return foto? foto.url: nophoto;
  }
}
