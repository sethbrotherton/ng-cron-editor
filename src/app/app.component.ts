import {Component} from '@angular/core';
import {CronOptionsInterface} from '../../projects/material-cron-jobs/src/lib/models.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hourlyCron: string;
  cronOptions: CronOptionsInterface = {
    includeHours: true,
    includeDates: true,
    includeMonths: true,
    includeDays: true,
    showHints: true,
    defaultCron: '5 6 7-9,10,13,15-19 8'
  };
  resultingCron = '';

  constructor() {
  }

  setCron(cronObject: { cron: string }): void {
    console.log(cronObject);
    this.hourlyCron = cronObject.cron;
  }

  showCron(event): void {
    console.log(event);
    this.resultingCron = event.cronString;
  }
}
