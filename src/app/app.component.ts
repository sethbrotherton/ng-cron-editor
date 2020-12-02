import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CronOptionsInterface} from '../../projects/material-cron-jobs/src/lib/models.model';
import {MatRadioChange} from '@angular/material/radio';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hourlyCron: string;
  cronOptions: CronOptionsInterface = {
    // jobType: 'hourly',
    includeMinutes: true,
    includeHours: true,
    includeDates: true,
    includeMonths: true,
    includeDays: true,
    includeMinutesBetween: true,
    includeHoursBetween: true,
    includeDaysBetween: true,
    includeMonthsBetween: true,
    includeDatesBetween: true,
    showHints: true,
    defaultCron: '*/5,0,15 */2,9,5 */6,15,30 */3,8,10 */3,1'
  };
  resultingCron = '';

  // jobTypes: string[] = ['minutely', 'hourly', 'daily', 'weekly', 'monthly'];
  otherSettings: string[] = ['includeMinutes', 'includeHours', 'includeDates', 'includeMonths', 'includeDays', 'showHints'];
  betweenSettings: string[] = ['includeMinutesBetween', 'includeHoursBetween', 'includeDatesBetween', 'includeMonthsBetween', 'includeDaysBetween'];
  @ViewChild('defaultCron') defaultCronInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.resultingCron = this.cronOptions.defaultCron;
  }

  setCron(cronObject: { cron: string }): void {
    console.log(cronObject);
    this.hourlyCron = cronObject.cron;
  }

  setJobType(event: MatRadioChange): void {
    // this.cronOptions.jobType = event.value;
    // console.log('event', event);
    // this.cronOptions = {
    //   ...this.cronOptions,
    //   jobType: event.value
    // };
    // console.log(this.cronOptions);
  }

  updateSetting(event: MatCheckboxChange, setting: string): void {
    this.cronOptions[setting] = event.checked;
  }

  updateDefaultCron(): void {
    console.log('new default', this.defaultCronInput.nativeElement.value);
    // this.cronOptions.defaultCron = this.defaultCronInput.nativeElement.value;
    this.cronOptions = {
      ...this.cronOptions,
      defaultCron: this.defaultCronInput.nativeElement.value
    };
    this.ngOnInit();
  }

  showCron(event): void {
    console.log(event);
    this.resultingCron = event.finalCron;
  }
}
