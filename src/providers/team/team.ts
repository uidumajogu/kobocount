import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase,} from 'angularfire2/database';
import firebase from 'firebase';

@Injectable()
export class TeamProvider {

  public userId: string;
  public rootRef: firebase.database.Reference;
  public userP: any;
  public companyP: any;
  public companyMbers: any;


  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    this.rootRef = firebase.database().ref('/');
  }


  updateCompanyProfile(companyType: string, companyPhoneNumber: string, street: string,
                       city: string, state: string, country: string): firebase.Promise<any>{

      return this.afDb.object(`/companyProfile/${this.userId}/`)
        .update({
          profileComplete: true,
          companyType: companyType,
          companyPhoneNumber: companyPhoneNumber,
          companyAddress: {
            street,
            city,
            state,
            country
          }
        });
  }

  changeUserStatus(uid: string, status: boolean ): firebase.Promise<any>{

    return this.afDb.object(`/companyProfile/${this.userId}/companyMembers/${uid}`)
      .update({
        active: status,
      }).then(()=> {
        return this.afDb.object(`/userProfile/${uid}`)
          .update({
            active: status,
          });
      });
  }


    getAdminStatus(): Promise<any> {
      return new Promise( (resolve, reject) => {
        this.afDb.object(`/userProfile/${this.userId}/companyAdmin`).subscribe( adminStatus => {
          resolve(adminStatus.$value);
        });
      });
    }


  getUserProfile(): Promise<any> {
    return new Promise( (resolve, reject) => {

      this.afAuth.authState.subscribe( user => {
        this.userId = user.uid;

        this.afDb.object(`/userProfile/${this.userId}`).subscribe( userProfile => {
          this.userP = userProfile;
          resolve(userProfile);
        });
      })
    });
  }


  getCompanyProfile(companyID): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.afDb.object(`/companyProfile/${companyID}/`).subscribe( companyProfile => {
        this.companyP = companyProfile;
        resolve(companyProfile);
      });
    });
  }

  getCompanyMembers(companyID): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.afDb.list(`/companyProfile/${companyID}/companyMembers`).subscribe( companyMembers => {
        this.companyMbers = companyMembers;
        resolve(companyMembers);
      });
    });
  }

}
