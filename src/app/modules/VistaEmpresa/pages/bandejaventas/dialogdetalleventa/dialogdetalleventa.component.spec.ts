import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdetalleventaComponent } from './dialogdetalleventa.component';

describe('DialogdetalleventaComponent', () => {
  let component: DialogdetalleventaComponent;
  let fixture: ComponentFixture<DialogdetalleventaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogdetalleventaComponent]
    });
    fixture = TestBed.createComponent(DialogdetalleventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
