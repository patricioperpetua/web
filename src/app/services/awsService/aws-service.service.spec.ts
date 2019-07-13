import { TestBed } from '@angular/core/testing';

import { AwsServiceService } from './aws-service.service';

describe('AwsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsServiceService = TestBed.get(AwsServiceService);
    expect(service).toBeTruthy();
  });
});
