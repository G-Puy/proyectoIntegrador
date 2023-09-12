import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarGlobalComponent } from './nav-bar-global.component';

describe('NavBarGlobalComponent', () => {
  let component: NavBarGlobalComponent;
  let fixture: ComponentFixture<NavBarGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarGlobalComponent]
    });
    fixture = TestBed.createComponent(NavBarGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
