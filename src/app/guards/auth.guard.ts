import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../pages/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data?.['expectedRole']; 
    const userRole = this.authService.getUserRole(); 

    if (userRole === expectedRole) {
      return true;
    } else {
      if(!expectedRole && userRole){ 
        return true;
      }
      this.router.navigate(['/auth/access']); 
      return false;
    }
  }
}
