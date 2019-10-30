import { TestBed } from '@angular/core/testing';

import { AguameterService } from './aguameter.service';

describe('AguameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AguameterService = TestBed.get(AguameterService);
    expect(service).toBeTruthy();
  });
});
