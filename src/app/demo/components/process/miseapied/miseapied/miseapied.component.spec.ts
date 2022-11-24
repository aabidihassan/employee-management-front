import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseapiedComponent } from './miseapied.component';

describe('MiseapiedComponent', () => {
  let component: MiseapiedComponent;
  let fixture: ComponentFixture<MiseapiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiseapiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiseapiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
