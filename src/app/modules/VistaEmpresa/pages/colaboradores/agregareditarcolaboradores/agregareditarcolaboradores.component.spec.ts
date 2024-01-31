import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregareditarcolaboradoresComponent } from './agregareditarcolaboradores.component';

describe('AgregareditarcolaboradoresComponent', () => {
  let component: AgregareditarcolaboradoresComponent;
  let fixture: ComponentFixture<AgregareditarcolaboradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregareditarcolaboradoresComponent]
    });
    fixture = TestBed.createComponent(AgregareditarcolaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
