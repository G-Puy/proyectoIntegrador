import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContrasniaComponent } from './cambio-contrasnia.component';

describe('CambioContrasniaComponent', () => {
  let component: CambioContrasniaComponent;
  let fixture: ComponentFixture<CambioContrasniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambioContrasniaComponent]
    });
    fixture = TestBed.createComponent(CambioContrasniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
