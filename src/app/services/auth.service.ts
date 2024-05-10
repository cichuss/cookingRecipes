import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  signUp(email: string, password: string, avatarUrl: string | null, username: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user !== null) {
          const { uid } = user;
          if (avatarUrl) {
            this.afs.collection('users').doc(uid).set({ username, avatarUrl });
          } else {
            this.afs.collection('users').doc(uid).set({ username });
          }
          console.log('Registration successful');
          this.router.navigate(['/home']);
        }
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
