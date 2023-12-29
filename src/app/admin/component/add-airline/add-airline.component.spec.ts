import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirlineComponent } from './add-airline.component';

describe('AddAirlineComponent', () => {
  let component: AddAirlineComponent;
  let fixture: ComponentFixture<AddAirlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAirlineComponent]
    });
    fixture = TestBed.createComponent(AddAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
