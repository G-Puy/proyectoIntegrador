import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogbuscadorComponent } from './dialogbuscador.component';

describe('DialogbuscadorComponent', () => {
  let component: DialogbuscadorComponent;
  let fixture: ComponentFixture<DialogbuscadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogbuscadorComponent]
    });
    fixture = TestBed.createComponent(DialogbuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
