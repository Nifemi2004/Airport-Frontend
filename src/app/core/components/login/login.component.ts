import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  logInForm!: FormGroup;
  formData!: User;

  ngOnInit(): void {
    this.logInForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  loginUser() {
    if (!this.logInForm.valid) return alert('Form is invalid.');

    this.authService.loginUser(this.logInForm.value).subscribe(
      (response) => {
        if (response.role === 'ADMIN') {
          this.router.navigate(['/addAdmin']);
        } else if (response.role === 'AIRLINE') {
          this.router.navigate(['/airlinePlanes']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if (error.status === 401) {
          console.log(error.error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid Credentials',
          });
        } else {
          console.log(error);
        }
      }
    );
  }
}
