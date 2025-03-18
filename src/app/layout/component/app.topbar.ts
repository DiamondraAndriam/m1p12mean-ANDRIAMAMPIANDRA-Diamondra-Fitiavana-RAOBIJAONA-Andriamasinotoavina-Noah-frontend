import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../pages/service/auth.service';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="https://i.ibb.co/Z638LJvc/logo-grand.png" alt="Logo de MekaNika" class="w-16 h-auto" />
                <span><span class="text-orange-500">MEKA</span>NIKA</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>

                    <p-menu #menu [popup]="true" [model]="overlayMenuItems"></p-menu>
                    <button type="button" class="layout-topbar-action" (click)="menu.toggle($event)">
                        <i class="pi pi-user"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    overlayMenuItems: MenuItem[] = [
        {
            label: 'Se déconnecter',
            icon: 'pi pi-refresh',
            command: () => this.onLogout() // Appelle la méthode onLogout() lors du clic
        }
    ];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) {}

    // Méthode pour basculer entre le mode sombre et le mode clair
    toggleDarkMode(): void {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    // Méthode pour gérer la déconnexion
    onLogout(): void {
        this.authService.logout(); // Appelle le service d'authentification pour déconnecter l'utilisateur
        this.router.navigate(['/auth/login']); // Redirige vers la page de connexion
    }
}
