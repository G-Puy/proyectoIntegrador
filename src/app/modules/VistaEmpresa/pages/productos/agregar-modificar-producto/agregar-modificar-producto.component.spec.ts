import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarModificarProductoComponent } from './agregar-modificar-producto.component';

describe('AgregarModificarProductoComponent', () => {
  let component: AgregarModificarProductoComponent;
  let fixture: ComponentFixture<AgregarModificarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarModificarProductoComponent]
    });
    fixture = TestBed.createComponent(AgregarModificarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
