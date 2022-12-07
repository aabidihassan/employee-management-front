import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddenquetteComponent } from './addenquette.component';

describe('AddenquetteComponent', () => {
  let component: AddenquetteComponent;
  let fixture: ComponentFixture<AddenquetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddenquetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddenquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
