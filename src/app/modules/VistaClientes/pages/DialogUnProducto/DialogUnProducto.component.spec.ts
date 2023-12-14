import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnProductoComponent } from './DialogUnProducto.component';

describe('DialogmenuComponent', () => {
  let component: DialogUnProductoComponent;
  let fixture: ComponentFixture<DialogUnProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUnProductoComponent]
    });
    fixture = TestBed.createComponent(DialogUnProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
