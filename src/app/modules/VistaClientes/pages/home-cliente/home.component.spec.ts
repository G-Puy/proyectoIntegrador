import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientesComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeClientesComponent;
  let fixture: ComponentFixture<HomeClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeClientesComponent]
    });
    fixture = TestBed.createComponent(HomeClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
