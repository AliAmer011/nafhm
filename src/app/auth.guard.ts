import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthuserService } from 'src/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router:Router,private _AuthService: AuthuserService) { }

  
  canActivate():boolean{
    if(this._AuthService.loggedIn())return true
    else 
    {
      this._Router.navigate(["/home"]);
      return false;
    }
  }
  
}
