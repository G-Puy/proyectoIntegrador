import { TestBed } from '@angular/core/testing';

import { CargarFotoServiceService } from './cargar-foto-service.service';

describe('CargarFotoServiceService', () => {
  let service: CargarFotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarFotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
