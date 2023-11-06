import { TestBed } from '@angular/core/testing';

import { FuncionesGlobalesService } from './funciones-globales.service';

describe('FuncionesGlobalesService', () => {
  let service: FuncionesGlobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionesGlobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
