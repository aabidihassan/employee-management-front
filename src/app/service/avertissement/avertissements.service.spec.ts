import { TestBed } from '@angular/core/testing';

import { AvertissementsService } from './avertissements.service';

describe('AvertissementsService', () => {
  let service: AvertissementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvertissementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
