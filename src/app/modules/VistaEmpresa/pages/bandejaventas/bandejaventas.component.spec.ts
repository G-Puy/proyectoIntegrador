import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaventasComponent } from './bandejaventas.component';

describe('BandejaventasComponent', () => {
  let component: BandejaventasComponent;
  let fixture: ComponentFixture<BandejaventasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaventasComponent]
    });
    fixture = TestBed.createComponent(BandejaventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
