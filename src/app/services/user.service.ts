import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any = {};
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe(userData => {
          this.userData = userData;
          this.userDataSubject.next(userData);
        });
      } else {
        this.userData = null;
        this.userDataSubject.next(null);
      }
    });
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
}
