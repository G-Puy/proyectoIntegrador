import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGenericoComponent } from './add-edit-generico.component';

describe('AddEditGenericoComponent', () => {
  let component: AddEditGenericoComponent;
  let fixture: ComponentFixture<AddEditGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditGenericoComponent]
    });
    fixture = TestBed.createComponent(AddEditGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
