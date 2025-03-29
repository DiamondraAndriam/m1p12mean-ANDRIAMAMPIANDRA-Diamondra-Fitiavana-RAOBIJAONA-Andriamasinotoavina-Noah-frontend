import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { BestSellingWidget } from './pages/dashboard/components/bestsellingwidget';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './pages/auth/login.component';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: BestSellingWidget, canActivate: [AuthGuard] },  // Utilisation du guard
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }