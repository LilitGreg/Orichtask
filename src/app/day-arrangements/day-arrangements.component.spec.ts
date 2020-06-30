import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayArrangementsComponent } from './day-arrangements.component';

describe('DayArrangementsComponent', () => {
  let component: DayArrangementsComponent;
  let fixture: ComponentFixture<DayArrangementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayArrangementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayArrangementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
