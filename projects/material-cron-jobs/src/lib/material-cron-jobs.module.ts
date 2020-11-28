import { NgModule } from '@angular/core';
import { MaterialCronJobsComponent } from './material-cron-jobs.component';
import { MatHourlyCronComponent } from './mat-hourly-cron/mat-hourly-cron.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { MatMinuteCronComponent } from './mat-minute-cron/mat-minute-cron.component';



@NgModule({
  declarations: [MaterialCronJobsComponent, MatHourlyCronComponent, MatMinuteCronComponent],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MaterialCronJobsComponent, MatHourlyCronComponent, MatMinuteCronComponent]
})
export class MaterialCronJobsModule { }
