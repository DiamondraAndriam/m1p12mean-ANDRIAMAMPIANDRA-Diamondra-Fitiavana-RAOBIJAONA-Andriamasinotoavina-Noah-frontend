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
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, CommonModule, ProgressSpinnerModule ],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] py-10 overflow-hidden">
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
                            <label for="firstname" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Prénom</label>
                            <input pInputText id="firstname" placeholder="Votre prénom" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.firstName" name="firstName" required />

                            <label for="lastName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nom</label>
                            <input pInputText id="lastName" placeholder="Votre nom" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.lastName" name="lastName" required />

                            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Téléphone</label>
                            <input pInputText id="email" placeholder="Votre email" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.email" type="email" name="email" required />

                            <label for="password" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Password</label>
                            <input pInputText id="password" placeholder="Mot de passe" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.password" type="password" name="password" required />

                            <label for="phone" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nom</label>
                            <input pInputText id="phone" placeholder="Votre numéro mobile" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.phone" name="phone" required />

                            <label for="address" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Adresse</label>
                            <input pInputText id="address" placeholder="Votre addresse" class="w-full md:w-[30rem] mb-8" [(ngModel)]="user.address" name="address" />

                            <div>
                                <p-button
                                    label="Se connecter"
                                    styleClass="w-full"
                                    [disabled]="isLoading"
                                    (click)="onRegister()"
                                >
                                    <ng-template pTemplate="content">
                                        <span *ngIf="!isLoading">S' inscrire</span>
                                        <span *ngIf="isLoading">
                                            <i class="pi pi-spinner pi-spin"></i> Inscription en cours...
                                        </span>
                                    </ng-template>
                                </p-button>
                            </div>
                            
                            <div class="mt-4 text-center">
                                <span class="text-muted-color">Vous avez déjà un compte ?</span>
                                <a routerLink="/auth/login" class="text-primary font-medium ml-2">Se connecter</a>
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
                width: 135px; /* Ajuste la taille du logo selon tes préférences */
                height: auto; /* Maintient les proportions de l'image */
            }

            .text-orange {
                color: #f97316;
            }
        </style>
    `
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
    isLoading: boolean = false;
  
    constructor(private authService: AuthService, private router: Router) { }
  
    onRegister(): void {
        this.isLoading = true;
        this.authService.register(this.user).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de l\'inscription';
          console.error(err);
        }
      });
    }
  }