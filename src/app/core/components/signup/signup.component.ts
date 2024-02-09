import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private formbuilder : FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

 signUpForm!: FormGroup
 formData!: User;

 ngOnInit(): void {
   this.signUpForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['USER', [Validators.required]],
    airlineId: [null],
   })
 }

 signUpUser() {
  if (!this.signUpForm.valid) return alert('Form is invalid.');

  this.authService.createUser(this.signUpForm.value).subscribe(
    (response) => {
      console.log(response);
    },
    (error: any) => console.log(error),
  );
  console.log(JSON.stringify(this.signUpForm.value))
  this.router.navigate(['/home']);
}

}
