import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';


@Injectable()
export class TransactionsProvider {

  public transactionRef: firebase.database.Reference;
  public transactionSummary: firebase.database.Reference;
  public transactionSale: firebase.database.Reference;
  public transactionExpense: firebase.database.Reference;
  public newExpenseType: firebase.database.Reference;
  public companyCustomers: firebase.database.Reference;
  public userId: string;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {

    afAuth.authState.subscribe( user => {
      this.userId = user.uid;
    });


    firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/companyId`).on('value', companyId => {
      this.transactionRef = firebase.database().ref(`/transactionByCompany/${companyId.val()}`);
      this.transactionSale = firebase.database().ref(`/saleByCompany/${companyId.val()}`);
      this.transactionExpense = firebase.database().ref(`/expenseByCompany/${companyId.val()}`);
      this.transactionSummary = firebase.database().ref(`/transactionSummaryByCompany/${companyId.val()}`);
      this.newExpenseType = firebase.database().ref(`/newExpenseTypes/`);
      this.companyCustomers = firebase.database().ref(`/customersByCompany/${companyId.val()}`);
    });
  }


  addTransaction(Type: string, ID: string, Date: string, Year: string, Month: string, YearMonth: string, Day: string, WeekDay: string, Week: any, Items: any,
                 SubTotal: number, GlobalDiscount: number, ShippingFee: number, VAT: any, TotalAmount: number, PaidAmount: number,
                 UnPaidAmount: number, PaymentMode: string, CustomerName: string, CustomerPhoneNumber: string, CustomerEmail: string,
                 DeliveryDate: string, DeliveryAddress: string, IsPaid: string, FullyPaid: boolean, InputerName: string, InputerEmail: string,
                 CompanyID: string, payments: any): firebase.Promise<any> {

    return this.afDb.list(`/transactionsByCompany/${CompanyID}/`).push({
        Type,
        ID,
        Date,
        Year,
        Month,
        YearMonth,
        Day,
        WeekDay,
        Week,
        Items,
        SubTotal,
        GlobalDiscount,
        ShippingFee,
        VAT,
        TotalAmount,
        PaidAmount,
        UnPaidAmount,
        PaymentMode,
        CustomerName,
        CustomerPhoneNumber,
        CustomerEmail,
        DeliveryDate,
        DeliveryAddress,
        IsPaid,
        FullyPaid,
        InputerName,
        InputerEmail,
        CompanyID,
        payments
    });
  }

  updateTransactionPymt(PaidAmount: number, UnPaidAmount: number, PaymentMode: string, IsPaid: string, FullyPaid: boolean,
                 CompanyID: string, TxnKey: string, payments: any): firebase.Promise<any> {

    return this.afDb.object(`/transactionsByCompany/${CompanyID}/${TxnKey}/`).update({
      PaidAmount,
      UnPaidAmount,
      PaymentMode,
      IsPaid,
      FullyPaid,
      payments
    });
  }


  addSale(Type: string, ID: string, Date: string, Year: string, Month: string, YearMonth: string, Day: string, WeekDay: string, Week: any, Items: any,
                 SubTotal: number, GlobalDiscount: number, ShippingFee: number, VAT: any, TotalAmount: number, PaidAmount: number,
                 UnPaidAmount: number, PaymentMode: string, CustomerName: string, CustomerPhoneNumber: string, CustomerEmail: string,
                 DeliveryDate: string, DeliveryAddress: string, IsPaid: string, FullyPaid: boolean, InputerName: string, InputerEmail: string,
                 CompanyID: string, payments: any): firebase.Promise<any> {

    return this.afDb.list(`/salesByCompany/${CompanyID}/`).push({
      Type,
      ID,
      Date,
      Year,
      Month,
      YearMonth,
      Day,
      WeekDay,
      Week,
      Items,
      SubTotal,
      GlobalDiscount,
      ShippingFee,
      VAT,
      TotalAmount,
      PaidAmount,
      UnPaidAmount,
      PaymentMode,
      CustomerName,
      CustomerPhoneNumber,
      CustomerEmail,
      DeliveryDate,
      DeliveryAddress,
      IsPaid,
      FullyPaid,
      InputerName,
      InputerEmail,
      CompanyID,
      payments
    });
  }

  updateSalePymt(PaidAmount: number, UnPaidAmount: number, PaymentMode: string, IsPaid: string, FullyPaid: boolean,
                        CompanyID: string, TxnKey: string, payments: any): firebase.Promise<any> {

    return this.afDb.object(`/salesByCompany/${CompanyID}/${TxnKey}`).update({
      PaidAmount,
      UnPaidAmount,
      PaymentMode,
      IsPaid,
      FullyPaid,
      payments
    });
  }

  addExpense(Type: string, ID: string, Date: string, Year: string, Month: string, YearMonth: string, Day: string, WeekDay: string, Week: any, Items: any,
                 SubTotal: number, GlobalDiscount: number, ShippingFee: number, VAT: any, TotalAmount: number, PaidAmount: number,
                 UnPaidAmount: number, PaymentMode: string, CustomerName: string, CustomerPhoneNumber: string, CustomerEmail: string,
                 DeliveryDate: string, DeliveryAddress: string, IsPaid: string, FullyPaid: boolean, InputerName: string, InputerEmail: string,
                 CompanyID: string, payments: any): firebase.Promise<any> {

    return this.afDb.list(`/expensesByCompany/${CompanyID}/`).push({
      Type,
      ID,
      Date,
      Year,
      Month,
      YearMonth,
      Day,
      WeekDay,
      Week,
      Items,
      SubTotal,
      GlobalDiscount,
      ShippingFee,
      VAT,
      TotalAmount,
      PaidAmount,
      UnPaidAmount,
      PaymentMode,
      CustomerName,
      CustomerPhoneNumber,
      CustomerEmail,
      DeliveryDate,
      DeliveryAddress,
      IsPaid,
      FullyPaid,
      InputerName,
      InputerEmail,
      CompanyID,
      payments
    });
  }


  getTeamMemberList(teamId:string): FirebaseListObservable<any> {
    return this.afDb.list(`/teamProfile/${teamId}/teamMembers`);
  }


  getAllTxns(companyID, byChild, equalTo): FirebaseListObservable<any> {
    return this.afDb.list(`/transactionsByCompany/${companyID}/`, {
      query: {
        orderByChild: byChild,
        equalTo: equalTo
      }
    });
  }


  getExpenseTxns(companyID, byChild, equalTo): FirebaseListObservable<any> {
    return this.afDb.list(`/expensesByCompany/${companyID}/`, {
      query: {
        orderByChild: byChild,
        equalTo: equalTo
      }
    });
  }


  getSalesTxns(companyID, byChild, equalTo): FirebaseListObservable<any> {
    return this.afDb.list(`/salesByCompany/${companyID}/`, {
      query: {
        orderByChild: byChild,
        equalTo: equalTo
      }
    });
  }


  getUnpaidTxns(companyID, byChild, equalTo): FirebaseListObservable<any> {
    return this.afDb.list(`/unpaidSalesByCompany/${companyID}/`, {
      query: {
        orderByChild: byChild,
        equalTo: equalTo
      }
    });
  }

  getOutsTxns(companyID, byChild, equalTo): FirebaseListObservable<any> {
    return this.afDb.list(`/salesByCompany/${companyID}/`, {
      query: {
        orderByChild: byChild,
        equalTo: equalTo
      }
    });
  }


}
