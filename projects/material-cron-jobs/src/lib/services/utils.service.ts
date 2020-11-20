import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  range(length: number): string[] {
    return Array(length).fill(1).map((x, y) => {
      const tot = x + y;
      if (tot < 10) {
        return '0' + tot;
      }
      return tot.toString();
    });
  }
}
