import {Injectable} from '@angular/core';
import * as firebaseAuth from "firebase/auth";
import * as firebase from "firebase/app";
import * as moment from "moment";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  initFirebase() {
    firebase.initializeApp(environment.firebaseConfig);
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebaseAuth
      .signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
      .then((userCredential) => {
        userCredential.user.getIdTokenResult().then(tokenRes => {
          this.setSession(tokenRes);
        });
      });
  }

  createUser(email: string, password: string): Promise<any> {
    return firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), email, password);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_role");
  }

  isLoggedIn() {
    return this.getExpiration() != null && moment().isBefore(this.getExpirationAsMoment());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpirationAsMoment() {
    const expiration = this.getExpiration();

    if (expiration != null) {
      return moment(expiration);
    }
    return moment();
  }

  sendResetPasswordEmail(email: string): Promise<any> {
    return firebaseAuth
      .sendPasswordResetEmail(firebaseAuth.getAuth(), email);
  }

  confirmPasswordReset(oobCode: string, password: string): Promise<any> {
    return firebaseAuth
      .confirmPasswordReset(firebaseAuth.getAuth(), oobCode, password);
  }

  private getExpiration() {
    return localStorage.getItem("expires_at");
  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', authResult.expirationTime);
  }
}
