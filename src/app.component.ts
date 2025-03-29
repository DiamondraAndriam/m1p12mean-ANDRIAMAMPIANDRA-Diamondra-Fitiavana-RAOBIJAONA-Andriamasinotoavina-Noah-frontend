import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './app/pages/service/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        if (this.authService.isTokenExpired()) {
        this.authService.logout();  // Déconnecter si le token est expiré
        }
    }
}