import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable,} from 'angularfire2/database';
import {TeamProvider} from "../team/team";

@Injectable()
export class ReportsProvider {


  public userId: string;
  public userProfile: any;
  public companyItems: any;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private teamProvider: TeamProvider) {
    afAuth.authState.subscribe( user => {
      this.userId = user.uid;
    });
  }


  addItems(CompanyID: string, description: string, stock: string, unitPrice: string, category: string,  hasItems: boolean): firebase.Promise<any> {
    return this.afDb.list(`/itemsByCompany/${CompanyID}/${category}/`).push({
      description,
      stock,
      unitPrice,
      category,
      hasItems,
    });
  }

  updateItems(CompanyID: string, description: string, stock: string, unitPrice: string, category: string,  hasItems: boolean, key: any): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${category}/${key}`).update({
      description,
      stock,
      unitPrice,
      category,
      hasItems,
    });
  }

  updateItemStock(CompanyID: string, stock: number, category: string,  key: any): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${category}/${key}`).update({
      stock,
    });
  }

  getItemStock( CompanyID: string, category: string, key: any ): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.afDb.object(`/itemsByCompany/${CompanyID}/${category}/${key}/stock`).subscribe( stockRem => {
        resolve(stockRem.$value);
      });
    });
  }

  deleteItems(CompanyID: string, category: string,  hasItems: boolean, key: any): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${category}/${key}`).set({
      category,
      hasItems,
    });
  }

  removeItems(CompanyID: string, category: string, key: any): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${category}/${key}`).remove();
  }

  updateCategory(CompanyID: string, oldcategory: string, newcategory: string, items: any): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${oldcategory}`).remove()
      .then(()=> {
      for (let item of items) {
        this.afDb.list(`/itemsByCompany/${CompanyID}/${newcategory}`).push({
          description: item.description,
          stock: item.stock,
          unitPrice: item.unitPrice,
          category: item.category,
          hasItems: item.hasItems,
        });
      }
      });
  }

  removeCategory(CompanyID: string, category: string): firebase.Promise<any> {
    return this.afDb.object(`/itemsByCompany/${CompanyID}/${category}`).remove();
  }


  getItems(): FirebaseListObservable<any> {
    this.userProfile = this.teamProvider.userP;
    return this.afDb.list(`/itemsByCompany/${this.userProfile.companyId}/`);
  }

  addExpenseCategory(expType: any): firebase.Promise<any> {
      return this.afDb.list(`/expenseCategories/`).push({
        expenseType: expType,
      });
  }

  getExpenseCategories(): FirebaseListObservable<any> {
    return this.afDb.list(`/expenseCategories/`);
  }

}
