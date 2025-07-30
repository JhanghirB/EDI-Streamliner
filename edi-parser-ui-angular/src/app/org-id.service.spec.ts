import { TestBed } from '@angular/core/testing';

import { OrgIDService } from './org-id.service';

describe('OrgIDService', () => {
  let service: OrgIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
