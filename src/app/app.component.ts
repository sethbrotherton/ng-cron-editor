import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CronOptionsInterface} from '../../projects/material-cron-jobs/src/lib/models.model';
import {MatCheckboxChange} from '@angular/material/checkbox';
import { faNpm } from '@fortawesome/free-brands-svg-icons/faNpm';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faNpm = faNpm;
  faGithub = faGithub;
  hourlyCron: string;
  cronOptions: CronOptionsInterface = {
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
    defaultCron: '0 0 1 1 *',
    flexDirection: 'row'
  };
  resultingCron = '';

  otherSettings: string[] = ['includeMinutes', 'includeHours', 'includeDates', 'includeMonths', 'includeDays', 'showHints'];
  betweenSettings: string[] = ['includeMinutesBetween', 'includeHoursBetween', 'includeDatesBetween', 'includeMonthsBetween', 'includeDaysBetween'];
  @ViewChild('defaultCron') defaultCronInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.resultingCron = this.cronOptions.defaultCron;
  }

  setCron(cronObject: { cron: string }): void {
    this.hourlyCron = cronObject.cron;
  }

  updateSetting(event: MatCheckboxChange, setting: string): void {
    this.cronOptions[setting] = event.checked;
  }

  showCron(event): void {
    this.resultingCron = event.cronValue;
  }
}
