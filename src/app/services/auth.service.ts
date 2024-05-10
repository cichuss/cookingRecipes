import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login successful');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('login error:', error);
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('signout successful');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('signout error:', error);
      });
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }
}
