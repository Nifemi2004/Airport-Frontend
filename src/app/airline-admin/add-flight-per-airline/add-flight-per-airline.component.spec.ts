import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightPerAirlineComponent } from './add-flight-per-airline.component';

describe('AddFlightPerAirlineComponent', () => {
  let component: AddFlightPerAirlineComponent;
  let fixture: ComponentFixture<AddFlightPerAirlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlightPerAirlineComponent]
    });
    fixture = TestBed.createComponent(AddFlightPerAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
