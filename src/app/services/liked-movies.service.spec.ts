import { TestBed } from '@angular/core/testing';

import { LikedMoviesService } from './liked-movies.service';

describe('LikedMoviesService', () => {
  let service: LikedMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
