import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarGlobalEmpresaComponent } from './nav-bar-global-empresa.component';

describe('NavBarGlobalEmpresaComponent', () => {
  let component: NavBarGlobalEmpresaComponent;
  let fixture: ComponentFixture<NavBarGlobalEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarGlobalEmpresaComponent]
    });
    fixture = TestBed.createComponent(NavBarGlobalEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
