import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoslosproductosComponent } from './todoslosproductos.component';

describe('TodoslosproductosComponent', () => {
  let component: TodoslosproductosComponent;
  let fixture: ComponentFixture<TodoslosproductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoslosproductosComponent]
    });
    fixture = TestBed.createComponent(TodoslosproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
