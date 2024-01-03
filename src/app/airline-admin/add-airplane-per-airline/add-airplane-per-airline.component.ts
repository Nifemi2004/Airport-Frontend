
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airplane } from 'src/app/shared/models/airplane';
import { AirplaneService } from 'src/app/shared/services/airplane.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-airplane-per-airline',
  templateUrl: './add-airplane-per-airline.component.html',
  styleUrls: ['./add-airplane-per-airline.component.css']
})
export class AddAirplanePerAirlineComponent {
  airplanes: Airplane[] = [];
  newAirplane!: Airplane;
  isModalOpen = false;
  isNewModalOpen = false;
  airplaneForm!: FormGroup;
  selectedAirplane!: Airplane;
  airlineId1: any;

  constructor(
    private formBuilder: FormBuilder,
    private airplaneService: AirplaneService,
    private authService: AuthService
  ) {
    this.airlineId1 = authService.userValue?.airlineId
  }

  ngOnInit() {

    console.log(this.airlineId1)
    this.airplaneForm = this.formBuilder.group({
      model: ['', [Validators.required]],
      capacity: [0, [Validators.required, Validators.min(1)]],
      code: ['', [Validators.required]],
    });

    this.airplaneService.getAllAirplaneByAirlineId(this.airlineId1).subscribe(
      (response: any[]) => {
        this.airplanes = response;
      },
      (error) => {
        console.log(error);
      }
    );

    return this.airplanes;
  }

  openEditModal(airplane: Airplane, index: any) {
    this.isModalOpen = true;
    // Set form controls based on the selected airplane
    this.airplaneForm.setValue({
      model: airplane.model,
      capacity: airplane.capacity,
      code: airplane.code,
    });
    this.selectedAirplane = airplane;

    console.log(this.selectedAirplane.id);
  }

  openNewModal() {
    this.isNewModalOpen = true;
  }

  closeNewModal() {
    this.isNewModalOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedAirplane = null as unknown as Airplane;
  }

  onEditSubmit() {
    if (this.airplaneForm.invalid) {
      return;
    }

    this.airplaneForm.removeControl('airline');

    this.airplaneService
      .updateAirplane(this.airplaneForm.value, this.selectedAirplane.id , this.airlineId1)
      .subscribe(
        (response) => {
          this.newAirplane = response;
        },
        (error) => {
          console.log(error);
        }
      );
    this.selectedAirplane = null as unknown as Airplane;
    this.airplaneForm.reset();
    this.isModalOpen = false;
  }

  onNewSubmit() {
    if (this.airplaneForm.invalid) {
      return;
    }

    // let airlineId =  this.airplaneForm.value.airline;

    // this.airplaneForm.removeControl('airline');

    this.airplaneService.createAirplane(this.airplaneForm.value, this.airlineId1).subscribe(
      (response) => {
        this.newAirplane = response;
        this.airplanes.push(this.newAirplane);
      },
      (error) => {
        console.log(error);
      }
    );
    this.airplaneForm.reset();
    this.isNewModalOpen = false;
  }

  onDelete(airplane: Airplane, index: any) {
    // Handle delete logic (call a service method to delete the airplane, for example)

    this.airplanes.splice(index, 1);
  }
}
