import { Injectable } from '@angular/core';
import {SelectOptionInterface} from '../models.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // range(length: number, startFromZero?: boolean): SelectOptionInterface[] {
  //   return Array(length).fill(1).map((x, y) => {
  //     const tot = x + y;
  //     let val;
  //     if (tot < 10) {
  //       val = '0' + tot;
  //     }
  //     val = tot.toString();
  //     return {
  //       value: parseInt(startFromZero ? val - 1 : val, 10),
  //       friendly: startFromZero ? val - 1 : val
  //     };
  //   });
  // }

  range(length: number, startFromZero?: boolean): SelectOptionInterface[] {
    return Array(length).fill(1).map((x, y) => {
      return {
        value: startFromZero ? x + y - 1 : x + y,
        friendly: startFromZero ? x + y - 1 : x + y
      };
    });
  }

  rangeOptions(length: number, unit: string): SelectOptionInterface[] {
    return Array(length).fill(1).map((x, y) => {
      return {
        value: x + y,
        friendly: `Every ${x + y} ${unit}${x + y > 1 ? 's' : ''}`
      };
    });
  }

  formatSequentialValues(arr: number[]): string {
    const obj = {};
    let key = 0;
    let prev;
    let cronString = '';
    arr.forEach((item) => {
      if (parseInt(`${item}`, 10) - 1 !== parseInt(`${prev}`, 10)) {
        key++;
      }
      if (!obj[key]) {
        obj[key] = [item];
      } else {
        obj[key].push(item);
      }
      prev = item;
    });

    for (const prop in obj) {
      if (obj[prop].length === 1) {
        cronString += obj[prop][0] + ',';
      } else if (obj[prop].length > 1) {
        cronString += obj[prop][0] + '-' + obj[prop][obj[prop].length - 1] + ',';
      }
    }
    cronString = cronString.slice(0, -1);
    console.log(obj);
    return cronString;
  }

  unformatSequentialValues(val: string): any[] {
    if (val.length === 1) {
      return [parseInt(val, 10)];
    }
    let split;
    const res = [];
    if (val.indexOf(',') > -1) {
      split = val.split(',');
    }
    if (split?.length) {
      split.forEach(item => {
        if (item.indexOf('-') > -1) {
          const ends = item.split('-');
          const first = ends[0];
          const last = ends[1];
          for (let i = first; i <= last; i++) {
            res.push(i);
          }
        } else {
          res.push(item);
        }
      });
    }
    return res.map(item => {
      return parseInt(item, 10);
    });
  }

  validateCron(cron: string): any {
    if (cron.split(' ').length !== 5) {
      throw new Error('Cron must have 5 values');
    }
  }
}
