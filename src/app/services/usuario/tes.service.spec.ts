import { TestBed } from '@angular/core/testing';

import { TesService } from './usuario.service';

describe('TesService', () => {
  let service: TesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
