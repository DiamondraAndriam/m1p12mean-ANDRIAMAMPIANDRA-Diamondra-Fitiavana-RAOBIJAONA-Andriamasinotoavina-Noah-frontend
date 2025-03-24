import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../pages/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data?.['expectedRole']; // Rôle attendu pour la route
    
    console.log('expectedRole',expectedRole);
    
    // if(!expectedRole)
    //   return true;
    
    const userRole = this.authService.getUserRole(); // Rôle de l'utilisateur connecté

    console.log('userRole',userRole);

    if (userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/auth/access']); // Redirection si le rôle ne correspond pas
      return false;
    }
  }
}
