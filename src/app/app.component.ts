import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatHourlyCronComponent} from "material-cron-jobs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hourlyCron: string;

  constructor() {
  }

  setCron(cronObject: { cron: string }): void {
    console.log(cronObject)
    this.hourlyCron = cronObject.cron;
  }
}
