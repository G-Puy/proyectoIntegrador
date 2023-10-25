import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEmpresaComponent } from './layout-empresa.component';

describe('LayoutEmpresaComponent', () => {
  let component: LayoutEmpresaComponent;
  let fixture: ComponentFixture<LayoutEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutEmpresaComponent]
    });
    fixture = TestBed.createComponent(LayoutEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
