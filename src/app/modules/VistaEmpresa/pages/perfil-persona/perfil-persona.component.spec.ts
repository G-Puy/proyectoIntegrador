import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPersonaComponent } from './perfil-persona.component';

describe('PerfilPersonaComponent', () => {
  let component: PerfilPersonaComponent;
  let fixture: ComponentFixture<PerfilPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPersonaComponent]
    });
    fixture = TestBed.createComponent(PerfilPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
