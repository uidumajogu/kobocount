import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import {TeamProvider} from "../team/team";
import {DateFsProvider} from "../date-fs/date-fs";


@Injectable()
export class AuthProvider {

  public userProfile: any;
  currentDate: any;

  constructor(private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase, private teamProvider: TeamProvider,
              private dfs: DateFsProvider) {
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  createAdminAccount(email:string, password:string, fullName:string,
                     companyName:string): firebase.Promise<any>{

    this.currentDate = this.dfs.dateNowFS;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        this.afDatabase.object(`/userProfile/${newUser.uid}`)
          .set({
            email,
            fullName,
            companyId: newUser.uid,
            companyName,
            active: true,
            companyAdmin: true,
            createdUser: this.currentDate,
            signedIn: this.currentDate
          })
          .then( ()=> {
            this.afDatabase.object(`/companyProfile/${newUser.uid}`)
              .set({
                companyName,
                companyAdmin: newUser.uid,
                profileComplete: false,
                createdCompany: this.currentDate,
                companyMembers: {
              [newUser.uid]: {
                fullName: fullName,
                email: email,
                active: true,
                companyAdmin: true,
                createdUser: this.currentDate,
                signedIn: this.currentDate
              }
            },
              });
          });
      }, error => { console.error(error); });
  }


  createMember(email:string, password:string, fullName:string,
                     companyID:string): firebase.Promise<any>{

    this.currentDate = this.dfs.dateNowFS;
    var cName = this.teamProvider.userP.companyName;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        this.afDatabase.object(`/userProfile/${newUser.uid}`)
          .set({
            email,
            fullName,
            companyId: companyID,
            companyName: cName,
            active: true,
            companyAdmin: false,
            createdUser: this.currentDate,
            signedIn: this.currentDate
          })
          .then( ()=> {
            this.afDatabase.object(`/companyProfile/${companyID}/companyMembers/${newUser.uid}`)
              .set({
              fullName: fullName,
              email: email,
              active: true,
              companyAdmin: false,
              createdUser: this.currentDate,
              signedIn: this.currentDate
              });
          });
      }, error => { console.error(error); });
  }


  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }


  resetPassword(email: string):firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }


  logoutUser():firebase.Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
