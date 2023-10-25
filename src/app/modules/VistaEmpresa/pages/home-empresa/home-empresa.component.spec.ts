import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmpresaComponent } from './home-empresa.component';

describe('HomeEmpresaComponent', () => {
  let component: HomeEmpresaComponent;
  let fixture: ComponentFixture<HomeEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEmpresaComponent]
    });
    fixture = TestBed.createComponent(HomeEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
