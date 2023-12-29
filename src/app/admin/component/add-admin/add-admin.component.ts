import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
      role: ['admin'],
    });
  }

  onSubmit() {
    if (this.adminForm.invalid) {
      return;
    }

    this.authService.createUser(this.adminForm.value).subscribe(
      (response) =>{
        console.log(response)
        console.log('success')
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
