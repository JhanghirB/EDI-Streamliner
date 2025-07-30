import { TestBed } from '@angular/core/testing';

import { JarExecutionService } from './jar-execution.service';

describe('JarExecutionService', () => {
  let service: JarExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JarExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
