import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {CronIndex, CronOptionsInterface, DaysOfWeek, Months, SelectOptionInterface} from '../models.model';
import {ReplaySubject} from 'rxjs';

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
    // this.addJobTypeControls();
    // this.addIncludedControls();
    this.setControlValues();
  }

  // addJobTypeControls(): void {
  //   if (this.cronOptions.jobType === 'minutely') {
  //     this.minuteCronForm.addControl('minutesBetweenCronControl', new FormControl(''));
  //   } else if (this.cronOptions.jobType === 'hourly') {
  //     this.minuteCronForm.addControl('hoursBetweenCronControl', new FormControl(''));
  //   } else if (this.cronOptions.jobType === 'daily') {
  //     this.minuteCronForm.addControl('datesBetweenCronControl', new FormControl(''));
  //   } else if (this.cronOptions.jobType === 'weekly') {
  //     this.minuteCronForm.addControl('daysBetweenCronControl', new FormControl(''));
  //   } else if (this.cronOptions.jobType === 'monthly') {
  //     this.minuteCronForm.addControl('monthsBetweenCronControl', new FormControl(''));
  //   }
  // }

  addIncludedControls(): void {
    if (this.cronOptions.includeMinutes) {
      this.minuteCronForm.addControl('minutesCronControl', new FormControl(('')));
    }
    if (this.cronOptions.includeHours) {
      this.minuteCronForm.addControl('hoursCronControl', new FormControl(''));
    }
    if (this.cronOptions.includeDates) {
      this.minuteCronForm.addControl('datesCronControl', new FormControl(''));
    }
    if (this.cronOptions.includeMonths) {
      this.minuteCronForm.addControl('monthsCronControl', new FormControl(''));
    }
    if (this.cronOptions.includeDays) {
      this.minuteCronForm.addControl('daysCronControl', new FormControl(''));
    }
  }

  setControlValues(): void {
    if (this.cronOptions?.defaultCron) {
      const [min, hrs, dts, mos, dys] = this.cronOptions.defaultCron.split(' ');
      console.log(min, hrs, dts, mos, dys);
      if (this.needsDeformatting(min)) {
        this.minuteCronForm.get('minutesBetweenCronControl').setValue(min);
      } else {
        this.minuteCronForm.get('minutesCronControl').setValue(this.utils.deFormatSequentialValues(min, 60, true));
      }
      if (this.needsDeformatting(hrs)) {
        console.log('not', hrs, typeof hrs);
        this.minuteCronForm.get('hoursBetweenCronControl').setValue([parseInt(hrs, 10)]);
      } else {
        console.log('test', this.utils.deFormatSequentialValues(hrs, 24, true));
        this.minuteCronForm.get('hoursCronControl').setValue(this.utils.deFormatSequentialValues(hrs, 24, true));
      }
      if (this.needsDeformatting(dts)) {
        this.minuteCronForm.get('datesBetweenCronControl').setValue(dts);
      } else {
        this.minuteCronForm.get('datesCronControl').setValue(this.utils.deFormatSequentialValues(dts, 31));
      }
      if (this.needsDeformatting(dys)) {
        this.minuteCronForm.get('daysBetweenCronControl').setValue(dys);
      } else {
        this.minuteCronForm.get('daysCronControl').setValue(this.utils.deFormatSequentialValues(dys, 7, true));
      }
      if (this.needsDeformatting(mos)) {
        this.minuteCronForm.get('monthsBetweenCronControl').setValue(mos);
      } else {
        this.minuteCronForm.get('monthsCronControl').setValue(this.utils.deFormatSequentialValues(mos, 12, true));
      }
    }
  }

  needsDeformatting(val: string): boolean {
    return /\/|\-/g.test(val);
  }

  emitCron(): void {
    this.cronEvent.emit({
      formValues: this.minuteCronForm.value,
      cronString: this.cronString
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

  ngOnDestroy(): void {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

}
