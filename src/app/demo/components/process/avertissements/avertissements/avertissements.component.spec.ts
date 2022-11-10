import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvertissementsComponent } from './avertissements.component';

describe('AvertissementsComponent', () => {
  let component: AvertissementsComponent;
  let fixture: ComponentFixture<AvertissementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvertissementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvertissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
