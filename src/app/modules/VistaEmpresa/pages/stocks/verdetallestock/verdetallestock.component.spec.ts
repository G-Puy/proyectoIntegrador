import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdetallestockComponent } from './verdetallestock.component';

describe('VerdetallestockComponent', () => {
  let component: VerdetallestockComponent;
  let fixture: ComponentFixture<VerdetallestockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerdetallestockComponent]
    });
    fixture = TestBed.createComponent(VerdetallestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
