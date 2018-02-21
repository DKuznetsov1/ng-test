import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../../core/models';

@Pipe({
  name: 'cartsort'
})
export class CartSortPipe implements PipeTransform {

  transform(items: Array<any>, property: string, desc: boolean = true): any {
    console.log(property);
    if (!property) {
      return items;
    }
    const result = this.sortBy(items, property, desc);
    return result;
  }

  // Gets property value of object by dot separated string path
  // a.b.c => a['b.c']
  private byString = function(o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      const a = s.split('.');
      for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
          if (k in o) {
              o = o[k];
          } else {
              return;
          }
      }
      return o;
  };

  // Sorts array using property value by given property path as criteria
  // If property under the given path is a function invokes it to get result
  private sortBy(items: Array<CartItem>, property: string, desc: boolean): any {
    const result = items.sort((a: CartItem, b: CartItem) => {
      let aValue = this.byString(a, property);
      if (typeof aValue === 'function') {
        aValue = aValue.call(this.getThisContext(a, property));
      }
      let bValue = this.byString(b, property);
      if (typeof bValue === 'function') {
        bValue = bValue.call(this.getThisContext(b, property));
      }
      return (aValue > bValue ?
      1 :
      aValue === bValue ?
        0 :
        -1)
      * (desc ? -1 : 1);
    });

      return result;
  }

  private getThisContext(obj, property) {
    let $this;
    const dotIndex = property.lastIndexOf('.');
    if (dotIndex === -1) {
      $this = obj;
    } else {
      $this = this.byString(obj, property.substring(0, dotIndex));
    }

    return $this;
  }

}
