import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {CronIndex, CronOptionsInterface, DaysOfWeek, Months} from '../models.model';
import {ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import set = Reflect.set;

@Component({
  selector: 'lib-mat-minute-cron',
  templateUrl: './mat-minute-cron.component.html',
  styleUrls: ['./mat-minute-cron.component.scss']
})
export class MatMinuteCronComponent implements OnInit, OnDestroy {

  @Output() cronEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() cronOptions: CronOptionsInterface = {
    includeHours: false,
    includeDates: false,
    includeMonths: false,
    includeDays: false,
    showHints: true,
    defaultCron: '5 * * * *'
  };

  minuteCronForm: FormGroup;
  minutes = this.utils.rangeOptions(60, 'minute');
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
    this.utils.validateCron(this.cronOptions.defaultCron);
    this.minuteCronForm = new FormGroup({
      minuteCronControl: new FormControl('', [])
    });

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

    if (this.cronOptions?.defaultCron) {
      const [min, hrs, dts, mos, dys] = this.cronOptions.defaultCron.split(' ');
      this.minuteCronForm.get('minuteCronControl').setValue(min);
      this.minuteCronForm.get('hoursCronControl').setValue(this.utils.unformatSequentialValues(hrs));
      this.minuteCronForm.get('datesCronControl').setValue(this.utils.unformatSequentialValues(dts));
      this.minuteCronForm.get('monthsCronControl').setValue(this.utils.unformatSequentialValues(mos));
      this.minuteCronForm.get('daysCronControl').setValue(this.utils.unformatSequentialValues(dys));
    }
  }

  emitCron(): void {
    this.cronEvent.emit({
      formValues: this.minuteCronForm.value,
      cronString: this.cronString
    });
  }

  formatMinutes(val: MatSelectChange): void {
    const formatted = `*/${parseInt(val.value, 10)}`;
    this.formatCron(formatted, 0);
  }

  formatHours(val: MatSelectChange): void {
    const hours = this.utils.formatSequentialValues(val.value);
    this.formatCron(hours, 1);
  }

  formatDates(val: MatSelectChange): void {
    const dates = this.utils.formatSequentialValues(val.value);
    this.formatCron(dates, 2);
  }

  formatMonths(val: MatSelectChange): void {
    const months = this.utils.formatSequentialValues(val.value);
    this.formatCron(months, 3);
  }

  formatDays(val: MatSelectChange): void {
    const days = this.utils.formatSequentialValues(val.value);
    this.formatCron(days, 4);
  }

  formatCron(val: string, index: CronIndex): void {
    const split = this.cronString.split(' ');
    split.splice(index, 1, val);
    this.cronString = split.join(' ');
    this.emitCron();
  }

  ngOnDestroy(): void {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

}
