import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/App/app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent , canActivate: [AuthGuard]}, // Protect the login route },
    { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard]}, // Protect the login route},
    { path: '', component: HomeComponent }, // Default route
];
