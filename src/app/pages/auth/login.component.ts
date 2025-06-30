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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        AppFloatingConfigurator,
        CommonModule,
        ProgressSpinnerModule // Ajoutez ProgressSpinnerModule ici
    ],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="mb-10 flex justify-center">
                                <img src="https://i.ibb.co/Z638LJvc/logo-grand.png" alt="Logo de MekaNika" class="logo" />
                            </div>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bienvenue sur <span class="text-orange">MEKA</span>NIKA !</div>
                            <span class="text-muted-color font-medium">Connectez-vous pour continuer</span>
                        </div>

                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" placeholder="Adresse email" class="w-full md:w-[30rem] mb-8" [(ngModel)]="credentials.email" name="email" required />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mot de passe</label>
                            <p-password id="password1" [(ngModel)]="credentials.password" type="password" name="password" required placeholder="Mot de passe" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <p-button 
                                [label]="isLoading ? 'Connexion...' : 'Se connecter'" 
                                [disabled]="isLoading"
                                styleClass="w-full" 
                                (click)="onLogin()">
                                <ng-template pTemplate="icon">
                                    <i *ngIf="isLoading" class="pi pi-spin pi-spinner"></i>
                                </ng-template>
                            </p-button>
                            
                            <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>

                            <div class="mt-4 text-center">
                                <span class="text-muted-color">Vous n'avez pas de compte ?</span>
                                <a routerLink="/auth/register" class="text-primary font-medium ml-2">S'inscrire</a>
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

            .logo {
                width: 135px;
                height: auto; 
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
    isLoading: boolean = false; // État de chargement

    constructor(private authService: AuthService, private router: Router) { }

    onLogin(): void {
        this.isLoading = true; 
        this.errorMessage = ''; 

        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                this.isLoading = false; 
                this.authService.setToken(response.token);
                this.router.navigateByUrl('/client/list-reparation').then(() => {
                    window.location.reload(); 
                });
            },
            error: (err) => {
                this.isLoading = false; 
                this.errorMessage = 'Erreur de connexion';
                console.error(err);
            }
        });
    }
}