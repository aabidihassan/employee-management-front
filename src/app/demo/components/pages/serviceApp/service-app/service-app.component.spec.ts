import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAppComponent } from './service-app.component';

describe('ServiceAppComponent', () => {
  let component: ServiceAppComponent;
  let fixture: ComponentFixture<ServiceAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
