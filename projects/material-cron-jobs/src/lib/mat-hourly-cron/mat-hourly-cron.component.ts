import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, takeLast, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lib-mat-hourly-cron',
  templateUrl: './mat-hourly-cron.component.html',
  styleUrls: ['./mat-hourly-cron.component.scss']
})
export class MatHourlyCronComponent implements OnInit, OnDestroy {

  minutes: string[];
  hourlyCron = '0 0 * * *';
  hourlyCronForm: FormGroup;
  hourlyCronSubject = new BehaviorSubject(null);
  private destroyer$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Output() cronEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    // this.minutes = this.utilsService.range(60);

    // this.hourlyCronForm = new FormControl(this.hourlyCron);

    this.hourlyCronForm = new FormGroup({
      hourlyCronControl: new FormControl(''),
    });

    this.hourlyCronForm.get('hourlyCronControl').valueChanges.pipe(takeUntil(this.destroyer$))
      .subscribe(val => {
        this.hourlyCronSubject.next(`0/${parseInt(val)} * * * *`);
        this.hourlyCronForm.controls.hourlyCronControl.patchValue(`0/${parseInt(val)} * * * *`)
      })

    this.hourlyCronForm.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroyer$)
    )
      .subscribe(val => {
        this.cronEvent.emit({original: val, cron: `0/${parseInt(val.hourlyCronControl)} * * * *`});
      })
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

}
