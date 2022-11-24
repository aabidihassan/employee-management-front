import { TestBed } from '@angular/core/testing';

import { MiseapiedService } from './miseapied.service';

describe('MiseapiedService', () => {
  let service: MiseapiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiseapiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
