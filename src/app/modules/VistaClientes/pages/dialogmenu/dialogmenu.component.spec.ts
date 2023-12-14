import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmenuComponent } from './dialogmenu.component';

describe('DialogmenuComponent', () => {
  let component: DialogmenuComponent;
  let fixture: ComponentFixture<DialogmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogmenuComponent]
    });
    fixture = TestBed.createComponent(DialogmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
