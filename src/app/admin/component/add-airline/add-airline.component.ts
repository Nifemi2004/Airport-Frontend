import { Component } from '@angular/core';
import { Airline } from 'src/app/shared/models/airline';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from 'src/app/shared/services/airline.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css'],
})
export class AddAirlineComponent {
  airlines: Airline[] = [];
  newAirline!: Airline;
  isModalOpen = false;
  isNewModalOpen = false;
  airlineForm!: FormGroup;
  selectedAirline!: Airline;
  editAirlineEvent: any;
  // userAirlineId: number | null | undefined;

  constructor(
    private airlineService: AirlineService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // this.userAirlineId = this.authService.userValue?.airlineId;
  }

  ngOnInit() {
    this.airlineForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      headquarters: ['', [Validators.required]],
    });



    this.airlineService.getAllAirline().subscribe(
      (response: any[]) => {
        this.airlines = response;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.airlines;
  }

  openEditModal(airline: Airline, index: any) {
    this.isModalOpen = true;
    this.airlineForm.setControl(
      'name',
      this.formBuilder.control(airline.name, Validators.required)
    );
    this.airlineForm.setControl(
      'headquarters',
      this.formBuilder.control(airline.headquarters, Validators.required)
    );
    this.selectedAirline = airline;

    return this.selectedAirline;
  }

  openNewModal() {
    this.isNewModalOpen = true;
  }

  closeNewModal() {
    this.isNewModalOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedAirline = null as unknown as Airline;
  }

  onEditSubmit() {
    if (this.airlineForm.invalid) {
      return;
    }

    this.airlineService
      .updateAirline(this.airlineForm.value, this.selectedAirline.id)
      .subscribe(
        (response) => {
          this.newAirline = response;
        },
        (error) => {
          console.log(error);
        }
      );

    this.selectedAirline = null as unknown as Airline;
    this.airlineForm.reset();
    this.isModalOpen = false;
    this.newAirline = null as unknown as Airline;
  }
  
  onNewSubmit() {
    if (this.airlineForm.invalid) {
      return;
    }

    this.airlineService.createAirline(this.airlineForm.value).subscribe(
      (response) => {
        this.newAirline = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.airlineForm.reset();
    this.isNewModalOpen = false;
    this.newAirline = null as unknown as Airline;
  }

  onDelete(airline: Airline, index: any) {   

    console.log(airline.id!)

    this.airlineService.deleteAirline(airline.id!).subscribe(
      (response) => {
        alert(response.name);
      },
      (error) => {
        console.log(error);
      }   
    )
    
    this.airlines.splice(index, 1);
  }
}
