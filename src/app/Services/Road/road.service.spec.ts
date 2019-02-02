import { TestBed, inject } from '@angular/core/testing';

import { RoadService } from './road.service';

describe('RoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoadService]
    });
  });

  it('should be created', inject([RoadService], (service: RoadService) => {
    expect(service).toBeTruthy();
  }));
});
