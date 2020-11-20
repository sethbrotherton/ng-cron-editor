import { NgModule } from '@angular/core';
import { MaterialCronJobsComponent } from './material-cron-jobs.component';
import { MatHourlyCronComponent } from './mat-hourly-cron/mat-hourly-cron.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [MaterialCronJobsComponent, MatHourlyCronComponent],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MaterialCronJobsComponent, MatHourlyCronComponent]
})
export class MaterialCronJobsModule { }
