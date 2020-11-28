import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMinuteCronComponent } from './mat-minute-cron.component';

describe('MatMinuteCronComponent', () => {
  let component: MatMinuteCronComponent;
  let fixture: ComponentFixture<MatMinuteCronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatMinuteCronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMinuteCronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
