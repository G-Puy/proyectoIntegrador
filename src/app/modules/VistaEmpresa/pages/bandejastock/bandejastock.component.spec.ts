import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejastockComponent } from './bandejastock.component';

describe('BandejastockComponent', () => {
  let component: BandejastockComponent;
  let fixture: ComponentFixture<BandejastockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejastockComponent]
    });
    fixture = TestBed.createComponent(BandejastockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
