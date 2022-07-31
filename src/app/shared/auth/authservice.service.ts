import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { User } from './user';
import { collection, Firestore } from '@angular/fire/firestore';
import { EncrServiceService } from '../encr/encr-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService implements OnInit {
  authState: any = null;
  item!: Observable<any>;
  public userData: any;
  public currentUser: any;
  public userStatus!: string;
  private itemDoc!: AngularFirestoreDocument<any>;
  public UserStatusChange: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.userStatus);

  constructor(
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private EncrDecr: EncrServiceService,
    public firestore: Firestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(sessionStorage.getItem('user')!);
      }
      else {
        sessionStorage.setItem('user', 'null');
        JSON.parse(sessionStorage.getItem('user')!);
      }
    });
  }

  ngOnInit() {}

  // Get user Status
  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.UserStatusChange.next(userStatus);
  }

  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.SetUserData(result.user)
        .then(() => {
          console.log('User Added to Firebase');
          this.SetUserData(result.user);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (error: any) {
      alert(error.message);
    }
  }

  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user?.uid !== 'gQgFGdP5HMgZs1PTZAYkVwDSSWX2') {
          window.alert('You are not the Admin');
          this.SignOut();
          this.router.navigate(['']);
        }

        this.ngZone.run(() => {
          this.userData = result.user;
          sessionStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(sessionStorage.getItem('user')!);
          this.router.navigate(['myvault']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          this.router.navigate(['myvault']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        var encrypted = this.EncrDecr.set(result.user?.email, result.user?.uid);
        var decrypted = this.EncrDecr.get(result.user?.email, encrypted);

        if (result.user?.uid !== decrypted) {
          window.alert('You are not the Admin');
          this.SignOut();
          this.router.navigate(['']);
        }

        this.ngZone.run(() => {
          this.userData = result.user;
          sessionStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(sessionStorage.getItem('user')!);
          this.router.navigate(['myvault']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SignOut() {
    this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        alert('Verification sent');
        this.router.navigate(['verify-email']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  isUserLoggedIn(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map((state) => !!state)
      .do((authenticated) => {
        return authenticated;
      });
  }

  isUserAdmin() {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    let collUrl = !this.isUserLoggedIn() ? 'abc' : user.uid;
    collUrl = 'myvault/vaultdata/admin/' + collUrl;
    return this.getDoc(collUrl);
  }

  getDoc(collUrl: string) {
    this.itemDoc = this.afs.doc<any>(collUrl);
    return this.itemDoc.valueChanges();
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const encrypted = this.EncrDecr.set(user.email, user.uid);
    const userData: User = {
      uid: encrypted,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
