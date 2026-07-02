import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyFormat',
  standalone: true
})
export class KeyFormatPipe implements PipeTransform {
  // Formats a raw key string into uppercase hyphen-separated 4-char blocks
  transform(value: string | undefined): string {
    if (!value) return '';

    const cleanVal = value.replace(/-/g, '').toUpperCase();
    const matches = cleanVal.match(/.{1,4}/g);

    if (matches) {
      return matches.join('-');
    }

    return cleanVal;
  }
}
