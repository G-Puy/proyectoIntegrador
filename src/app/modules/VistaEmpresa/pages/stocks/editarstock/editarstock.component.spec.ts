import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarstockComponent } from './editarstock.component';

describe('EditarstockComponent', () => {
  let component: EditarstockComponent;
  let fixture: ComponentFixture<EditarstockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarstockComponent]
    });
    fixture = TestBed.createComponent(EditarstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
