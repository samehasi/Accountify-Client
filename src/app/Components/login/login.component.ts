import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { signInRequest } from '../../State/app.actions';
import { selectIsAuthFailed } from '../../State/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected logInFail$: Observable<boolean>;

goBack() {
  this.router.navigate(['']);  // Change '/home' to your desired route
}
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private translate: TranslateService,private router: Router,private store:Store) {


    this.logInFail$ = this.store.select(selectIsAuthFailed);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
    this.store.dispatch(signInRequest({ email:this.loginForm.get('email')?.value , password:this.loginForm.get('password')?.value }));
      console.log(this.loginForm.value); // Handle the form submission
    }
  }
}
