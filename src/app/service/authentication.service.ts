import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public ngFireAuth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  googleAuth() {
    return this.ngFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
