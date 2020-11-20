import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatHourlyCronComponent } from './mat-hourly-cron.component';

describe('MatHourlyCronComponent', () => {
  let component: MatHourlyCronComponent;
  let fixture: ComponentFixture<MatHourlyCronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatHourlyCronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatHourlyCronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
