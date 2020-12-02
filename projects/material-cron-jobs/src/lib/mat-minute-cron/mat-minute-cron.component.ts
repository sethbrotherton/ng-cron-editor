import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {CronIndex, CronOptionsInterface, DaysOfWeek, Months, SelectOptionInterface} from '../models.model';
import {ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lib-mat-minute-cron',
  templateUrl: './mat-minute-cron.component.html',
  styleUrls: ['./mat-minute-cron.component.scss']
})
export class MatMinuteCronComponent implements OnInit, OnDestroy {

  @Output() cronEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() cronOptions: CronOptionsInterface = {
    // jobType: null,
    includeMinutes: false,
    includeHours: false,
    includeDates: false,
    includeMonths: false,
    includeDays: false,
    includeMinutesBetween: false,
    includeHoursBetween: false,
    includeDatesBetween: false,
    includeMonthsBetween: false,
    includeDaysBetween: false,
    showHints: true,
    defaultCron: '0 0 0 0 0'
  };

  minuteCronForm: FormGroup;
  minutesBetween = this.utils.rangeOptions(60, 'minute');
  hoursBetween = this.utils.rangeOptions(24, 'hour');
  datesBetween = this.utils.rangeOptions(31, 'day');
  monthsBetween = this.utils.rangeOptions(12, 'month');
  daysBetween = this.utils.rangeOptions(7, 'weekday');

  minutes = this.utils.range(60, true);
  hours = this.utils.range(24, true);
  monthDays = this.utils.range(31);
  weekDays = Object.keys(DaysOfWeek).map(day => {
    return {
      value: DaysOfWeek[day],
      friendly: day
    };
  });
  months = Object.keys(Months).map(month => {
    return {
      value: Months[month],
      friendly: month
    };
  });
  private destroyer$: ReplaySubject<boolean> = new ReplaySubject<boolean>(null);

  cronString = '* * * * *';

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    this.cronString = this.cronOptions.defaultCron;
    this.utils.validateCron(this.cronOptions.defaultCron);
    this.minuteCronForm = new FormGroup({
      minutesBetweenCronControl: new FormControl(''),
      hoursBetweenCronControl: new FormControl(''),
      datesBetweenCronControl: new FormControl(''),
      daysBetweenCronControl: new FormControl(''),
      monthsBetweenCronControl: new FormControl(''),

      minutesCronControl: new FormControl(''),
      hoursCronControl: new FormControl(''),
      datesCronControl: new FormControl(''),
      monthsCronControl: new FormControl(''),
      daysCronControl: new FormControl('')
    });
    this.setControlValues();

    // this.minuteCronForm.valueChanges.pipe(takeUntil(this.destroyer$))
    //   .subscribe(val => {
    //     this.minuteCronForm.updateValueAndValidity();
    //   });
    // this.minuteCronForm.get('minutesBetweenCronControl').valueChanges.pipe(takeUntil(this.destroyer$))
    //   .subscribe(val => {
    //     this.minuteCronForm.get('minutesCronControl').updateValueAndValidity();
    //   });
    // this.minuteCronForm.get('minutesCronControl').valueChanges.pipe(takeUntil(this.destroyer$))
    //   .subscribe(val => {
    //     this.minuteCronForm.get('minutesBetweenCronControl').updateValueAndValidity();
    //   });
  }

  setControlValues(): void {
    if (this.cronOptions?.defaultCron) {
      const [min, hrs, dts, mos, dys] = this.cronOptions.defaultCron.split(' ');
      console.log(min, hrs, dts, mos, dys);
      const minSegments = min.split(',');
      const btwnMins = minSegments.filter(part => /\*\/\d/g.test(part));
      const restMins = minSegments.filter(part => !/\*\/\d/g.test(part));
      if (btwnMins[0]) {
        this.minuteCronForm.get('minutesBetweenCronControl').setValue(btwnMins[0]);
      }
      if (restMins.length){
        this.minuteCronForm.get('minutesCronControl').setValue(this.utils.deFormatSequentialValues(restMins.join(','), 60, true));
      }

      const hrSegments = hrs.split(',');
      const btwnHrs = hrSegments.filter(part => /\*\/\d/g.test(part));
      const restHrs = hrSegments.filter(part => !/\*\/\d/g.test(part));
      if (btwnHrs[0]) {
        this.minuteCronForm.get('hoursBetweenCronControl').setValue(btwnHrs[0]);
      }
      if (restHrs.length) {
        this.minuteCronForm.get('hoursCronControl').setValue(this.utils.deFormatSequentialValues(restHrs.join(','), 24, true));
      }

      const dtSegments = dts.split(',');
      const btwnDts = dtSegments.filter(part => /\*\/\d/g.test(part));
      const restDts = dtSegments.filter(part => !/\*\/\d/g.test(part));
      if (btwnDts[0]) {
        this.minuteCronForm.get('datesBetweenCronControl').setValue(btwnDts[0]);
      }
      if (restDts.length) {
        this.minuteCronForm.get('datesCronControl').setValue(this.utils.deFormatSequentialValues(restDts.join(','), 31));
      }

      const dySegments = dys.split(',');
      const btwnDys = dySegments.filter(part => /\*\/\d/g.test(part));
      const restDys = dySegments.filter(part => !/\*\/\d/g.test(part));
      if (btwnDys[0]) {
        this.minuteCronForm.get('daysBetweenCronControl').setValue(btwnDys[0]);
      }
      if (restDys.length) {
        this.minuteCronForm.get('daysCronControl').setValue(this.utils.deFormatSequentialValues(restDys.join(','), 7, true));
      }

      const moSegments = mos.split(',');
      const btwnMos = moSegments.filter(part => /\*\/\d/g.test(part));
      const restMos = moSegments.filter(part => !/\*\/\d/g.test(part));
      if (btwnMos[0]) {
        this.minuteCronForm.get('monthsBetweenCronControl').setValue(btwnMos[0]);
      }
      if (restMos.length) {
        this.minuteCronForm.get('monthsCronControl').setValue(this.utils.deFormatSequentialValues(restMos.join(','), 12, true));
      }
    }
  }

  needsDeformatting(val: string): boolean {
    return /\/|\-/g.test(val);
  }

  emitCron(): void {
    this.cronEvent.emit({
      formValues: this.minuteCronForm.value,
      cronString: this.cronString,
      finalCron: this.finalCronFormat()
    });
  }

  formatMinutesBetween(val: MatSelectChange): void {
    this.formatCron(val.value, 0);
  }

  formatHoursBetween(val: MatSelectChange): void {
    this.formatCron(val.value, 1);
  }

  formatDatesBetween(val: MatSelectChange): void {
    this.formatCron(val.value, 2);
  }

  formatMonthsBetween(val: MatSelectChange): void {
    this.formatCron(val.value, 3);
  }

  formatDaysBetween(val: MatSelectChange): void {
    this.formatCron(val.value, 4);
  }

  formatMinutes(val: MatSelectChange): void {
    const minutes = this.utils.formatSequentialValues(val.value, 'minutes');
    this.formatCron(minutes, 0);
  }

  formatHours(val: MatSelectChange): void {
    const hours = this.utils.formatSequentialValues(val.value, 'hours');
    this.formatCron(hours, 1);
  }

  formatDates(val: MatSelectChange): void {
    const dates = this.utils.formatSequentialValues(val.value, 'dates');
    this.formatCron(dates, 2);
  }

  formatMonths(val: MatSelectChange): void {
    const months = this.utils.formatSequentialValues(val.value, 'months');
    this.formatCron(months, 3);
  }

  formatDays(val: MatSelectChange): void {
    const days = this.utils.formatSequentialValues(val.value, 'days');
    this.formatCron(days, 4);
  }

  formatCron(val: string, index: CronIndex): void {
    const split = this.cronString.split(' ');
    split.splice(index, 1, val);
    this.cronString = split.join(' ');
    this.emitCron();
  }

  selectAll(controlName: string, values: SelectOptionInterface[], index: CronIndex): void {
    const control = this.minuteCronForm.get(controlName);
    const onlyNumbers = values.map(item => item.value);
    control.setValue(onlyNumbers);
    this.formatCron('*', index);
  }

  unSelectAll(controlName: string): void {
    this.minuteCronForm.get(controlName).setValue([]);
  }

  // conditionallyRequired(otherControlName: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors => {
  //     if (!control.parent) {
  //       return null;
  //     }
  //     // const thisControlVal = control.value;
  //     const otherControlVal = control.parent.get(otherControlName).value;
  //     if (otherControlVal === '' || otherControlVal === []) {
  //       return Validators.required(control);
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  finalCronFormat(): string {
    let minutesValue: string;
    let hoursValue: string;
    let datesValue: string;
    let monthsValue: string;
    let daysValue: string;
    // Handle minutes
    const minutesBetween = this.minuteCronForm.get('minutesBetweenCronControl').value;
    const minutes = this.utils.formatSequentialValues(this.minuteCronForm.get('minutesCronControl').value, 'minutes');
    if (minutesBetween && minutes.length) {
      minutesValue = [minutesBetween, ...minutes.split(',')].join(',');
    } else if (minutesBetween && !minutes.length) {
      minutesValue = minutesBetween;
    } else {
      minutesValue = minutes;
    }
    // Handle hours
    const hoursBetween = this.minuteCronForm.get('hoursBetweenCronControl').value;
    const hours = this.utils.formatSequentialValues(this.minuteCronForm.get('hoursCronControl').value, 'hours');
    if (hoursBetween) {
      hoursValue = [hoursBetween, ...hours.split(',')].join(',');
    } else if (hoursBetween && !hours.length) {
      hoursValue = hoursBetween;
    } else {
      hoursValue = hours;
    }
    // Handle dates
    const datesBetween = this.minuteCronForm.get('datesBetweenCronControl').value;
    const dates = this.utils.formatSequentialValues(this.minuteCronForm.get('datesCronControl').value, 'dates');
    if (datesBetween) {
      datesValue = [datesBetween, ...dates.split(',')].join(',');
    } else if (datesBetween && !dates.length) {
      datesValue = datesBetween;
    } else {
      datesValue = dates;
    }
    // Handle months
    const monthsBetween = this.minuteCronForm.get('monthsBetweenCronControl').value;
    const months = this.utils.formatSequentialValues(this.minuteCronForm.get('monthsCronControl').value, 'months');
    if (monthsBetween) {
      monthsValue = [monthsBetween, ...months.split(',')].join(',');
    } else if (monthsBetween && !months.length) {
      monthsValue = monthsBetween;
    } else {
      monthsValue = months;
    }
    // Handle days
    const daysBetween = this.minuteCronForm.get('daysBetweenCronControl').value;
    const days = this.utils.formatSequentialValues(this.minuteCronForm.get('daysCronControl').value, 'days');
    if (daysBetween) {
      daysValue = [daysBetween, ...days.split(',')].join(',');
    } else if (daysBetween && !days.length) {
      daysValue = daysBetween;
    } else {
      daysValue = days;
    }
    return `${minutesValue} ${hoursValue} ${datesValue} ${monthsValue} ${daysValue}`;
  }

  ngOnDestroy(): void {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

}
