import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClientesComponent } from './layout-clientes.component';

describe('LayoutClientesComponent', () => {
  let component: LayoutClientesComponent;
  let fixture: ComponentFixture<LayoutClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutClientesComponent]
    });
    fixture = TestBed.createComponent(LayoutClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
