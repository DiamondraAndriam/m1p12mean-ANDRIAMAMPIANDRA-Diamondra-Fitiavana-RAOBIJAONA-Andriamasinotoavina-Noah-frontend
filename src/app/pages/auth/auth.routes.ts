import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { Login } from './login.component';
import { RegisterComponent } from './register.component';
import { RegisterMechanicComponent } from './register-mechanic.component';
import { LoginMechanic } from './login-mechanic.component';
import { LoginManager } from './login-mangager.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'login-mechanic', component: LoginMechanic },
    { path: 'login-manager', component: LoginManager },
    { path: 'register', component: RegisterComponent },
    { path: 'register-mechanic', component: RegisterMechanicComponent }
] as Routes;