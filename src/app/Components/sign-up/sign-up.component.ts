import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import {  signInRequest, signUpRequest } from '../../State/app.actions';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule
  ]
})
export class SignUpComponent implements OnInit {
  goBack() {
    this.router.navigate(['']);  // Change '/home' to your desired route
  }
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder ,
     private router:Router ,
     private store:Store,
      private authService:AuthService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''], // Added Confirm Password field
      name: [''],
      surname: [''],
      telephone: ['', [Validators.pattern('[- +()0-9]+')]]
    }, {
      validator: this.passwordMatchValidator // Custom validator for matching passwords
    });
  }

  // Validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  // Submit function
  onSubmit(): void {

    if (this.signUpForm.valid) {
      this.store.dispatch(signUpRequest({ email:this.signUpForm.get('email')?.value , password:this.signUpForm.get('password')?.value }));
        console.log(this.signUpForm.value); // Handle the form submission
      }


    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);  // Handle sign-up logic
    this.store.dispatch(signInRequest({ email:this.signUpForm.get('email')?.value , password:this.signUpForm.get('password')?.value }));
    } else {
      console.log('Form is invalid');
    }
  }

  // Helper to access form controls easily in the template
  get f() {
    return this.signUpForm.controls;
  }
}
