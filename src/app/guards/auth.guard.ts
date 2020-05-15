import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private userData: Observable<firebase.User | null >;

  constructor(private _auth:AuthService, private router:Router,private afAuth: AngularFireAuth){}
  canActivate(): boolean {


console.log("Guard");
  if(this.userData){
    return true
  }else{
    this.router.navigateByUrl('/login')
    return false
  }


  }

  get authenticated():boolean {
     return this.userData != null; // True ó False
  }
  get currentUser(): Observable<firebase.User | null> {
    return this.userData;
  }


}
