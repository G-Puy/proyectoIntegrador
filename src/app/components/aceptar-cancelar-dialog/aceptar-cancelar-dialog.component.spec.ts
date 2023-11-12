import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarCancelarDialogComponent } from './aceptar-cancelar-dialog.component';

describe('AceptarCancelarDialogComponent', () => {
  let component: AceptarCancelarDialogComponent;
  let fixture: ComponentFixture<AceptarCancelarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AceptarCancelarDialogComponent]
    });
    fixture = TestBed.createComponent(AceptarCancelarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
