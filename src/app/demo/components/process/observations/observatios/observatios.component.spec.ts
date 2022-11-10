import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatiosComponent } from './observatios.component';

describe('ObservatiosComponent', () => {
  let component: ObservatiosComponent;
  let fixture: ComponentFixture<ObservatiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservatiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservatiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
