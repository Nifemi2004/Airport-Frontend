import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirplanePerAirlineComponent } from './add-airplane-per-airline.component';

describe('AddAirplanePerAirlineComponent', () => {
  let component: AddAirplanePerAirlineComponent;
  let fixture: ComponentFixture<AddAirplanePerAirlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAirplanePerAirlineComponent]
    });
    fixture = TestBed.createComponent(AddAirplanePerAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
