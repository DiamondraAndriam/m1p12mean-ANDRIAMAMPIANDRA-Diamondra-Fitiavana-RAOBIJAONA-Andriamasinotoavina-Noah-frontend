import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../pages/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'client' // Par défaut, le rôle est "client"
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'inscription';
        console.error(err);
      }
    });
  }
}
