import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../service/auth.service';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, CommonModule ],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="logo-container">
                                <img src="assets/logo.png" alt="MekaNika Logo" class="logo" />
                            </div>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to <span class="text-orange">MEKA</span>NIKA!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" [(ngModel)]="credentials.email" name="email" required />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" [(ngModel)]="credentials.password" type="password" name="password" required placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <p-button label="Sign In" styleClass="w-full" routerLink="/" (click)="onLogin()"></p-button>
                            
                            <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>

                            <div class="mt-4 text-center">
                                <span class="text-muted-color">Don't have an account?</span>
                                <a routerLink="/auth/register" class="text-primary font-medium ml-2">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .error-message {
                background-color: #f8d7da; /* Fond rouge clair */
                color: #721c24; /* Texte rouge sombre */
                padding: 15px;
                border: 1px solid #f5c6cb; /* Bordure rouge clair */
                border-radius: 5px; /* Coins arrondis */
                margin: 10px 0; /* Espacement vertical */
                font-size: 16px; /* Taille du texte */
                font-weight: bold; /* Texte en gras */
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre discrète */
            }

            .logo-container {
                margin-bottom: 20px; /* Espacement entre le logo et le texte */
            }

            .logo {
                width: 120px; /* Ajuste la taille du logo selon tes préférences */
                height: auto; /* Maintient les proportions de l'image */
            }

            .text-orange {
                color: #f97316;
            }
        </style>
    `
})
export class Login {
    credentials = {
        email: 'jean.dupont@example.com',
        password: '0000'
      };
      errorMessage: string = '';
    
      constructor(private authService: AuthService, private router: Router) { }
    
      onLogin(): void {
        this.authService.login(this.credentials).subscribe({
          next: (response) => {
            // Stocker le token dans le localStorage
            this.authService.setToken(response.token);
            this.router.navigate(['/']);  // Rediriger après connexion
          },
          error: (err) => {
            this.errorMessage = 'Erreur de connexion';
            console.error(err);
          }
        });
    }
}