import { TestBed } from '@angular/core/testing';

import { SavedCourseService } from '../services/saved-course.service';

describe('SavedCourseService', () => {
  let service: SavedCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
