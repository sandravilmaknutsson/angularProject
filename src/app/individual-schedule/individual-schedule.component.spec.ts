import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualScheduleComponent } from './individual-schedule.component';

describe('IndividualScheduleComponent', () => {
  let component: IndividualScheduleComponent;
  let fixture: ComponentFixture<IndividualScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
