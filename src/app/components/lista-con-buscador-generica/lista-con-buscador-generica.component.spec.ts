import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConBuscadorGenericaComponent } from './lista-con-buscador-generica.component';

describe('ListaConBuscadorGenericaComponent', () => {
  let component: ListaConBuscadorGenericaComponent;
  let fixture: ComponentFixture<ListaConBuscadorGenericaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaConBuscadorGenericaComponent]
    });
    fixture = TestBed.createComponent(ListaConBuscadorGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
