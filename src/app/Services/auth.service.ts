import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, of, switchMap, tap, throwError } from "rxjs";
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';


 interface AuthResponseData{
    readonly idToken:string;
    readonly email:string;
    readonly refreshToken:string;
    readonly expiresIn:string;
    readonly localId:string;
}


@Injectable({providedIn:'root'})
export class AuthService{
constructor(private http:HttpClient , private afAuth: AngularFireAuth,private firestore: Firestore ){}


public newSignIn(email:string , password:string)
{
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(res =>
        {
          console.log(res)

          return from(res.user!.getIdToken()).pipe(
            map(token =>
              {
                return {idToken:token , email:res.user?.email} as AuthResponseData;
              })
          );
        })
    );
}

public newSignOut()
{
    return from(this.afAuth.signOut());
}

public newSignUp(email:string , password:string)
{
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(

      switchMap(userCredential =>{
        const user = userCredential.user;
        if (user) {
          // Create a document reference in Firestore for the user
          const userDocRef = doc(this.firestore, `users/${user.uid}`);
          // Save additional user info (like phone number) in Firestore
          //return from(setDoc(userDocRef, { email: user.email, phoneNumber: 64 })).pipe(
          return of(1).pipe(
           map(ret => userCredential),
           switchMap(res =>
            {
              
              return from(res.user!.getIdToken()).pipe(
                map(token =>
                  {
                    return {idToken:token , email:res.user?.email} as AuthResponseData;
                  })
              );
            })
          );
        } else {
          throw new Error('User creation failed');
        }
      }),
    );
;

}

private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}