import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { Login } from './login.component';
import { RegisterComponent } from './register.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: RegisterComponent }
] as Routes;