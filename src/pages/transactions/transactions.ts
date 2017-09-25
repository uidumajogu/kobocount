import { Component } from '@angular/core';
import {FabContainer, IonicPage, ModalController, NavController} from 'ionic-angular';
import {DateFsProvider} from "../../providers/date-fs/date-fs";
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  fwdBtn: boolean;
  monthDescription: any;
  monthStr: any;
  pDescription: any;
  userProfile: any;
  companyID: any;
  yearMonth: any;
  allTxns: Array<any> = [];
  noTxns: boolean;
  public txnBtn: boolean;
  saleBtn: boolean;
  expBtn: boolean;
  unpaidBtn: boolean;
  reportDescription: any;
  totalTxn: number = 0;
  totalSales: number = 0;
  totalExp: number = 0;
  totalUnpaid: number = 0;
  mBal: any;
  overlayHidden: boolean;


  constructor(private navCtrl: NavController, private dfs: DateFsProvider, private transactionProvider: TransactionsProvider,
              private teamProvider: TeamProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

    this.overlayHidden = true;

    this.userProfile = this.teamProvider.userP;
    this.companyID = this.userProfile.companyId;

    // this.dYear = this.dfs.yearNowFS;
    // this.dDate = this.dfs.dateNowFS;
    // this.dWeek = +this.dfs.weekNowFS;
    // this.dMonth = this.dfs.monthNowFS;
    this.yearMonth = this.dfs.yearMonthNowFS;
    // this.dDay = this.dfs.dayNowFS;
    //
    // this.dDayStr = this.dfs.dayNowSFS;
    this.monthStr = this.dfs.dayNowSFS;
    // this.dWeekStr = this.dfs.dayNowSFS;
    // this.dYearStr = this.dfs.dayNowSFS;

    // this.yDescription = this.dfs.dateYear(this.dYearStr);
    this.monthDescription = this.dfs.dateMonthYear(this.monthStr);
    // this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
    // this.dDescription = this.dfs.dateFullString(this.dDayStr);

    this.txnBtn = true;
    this.saleBtn = false;
    this.expBtn = false;
    this.unpaidBtn = false;
    this.reportDescription = "TRANSACTIONS";
    this.monthReport(this.companyID, 'YearMonth', this.yearMonth);

  }


  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }



  monthReport(ID, YMS, CYM) {

    this.allTxns = [];
    this.pDescription = this.monthDescription;

    if (this.txnBtn) {
      this.transactionProvider.getAllTxns(ID, YMS, CYM).subscribe( data => {
        this.allTxns = data;
        if (this.allTxns.length === 0) {
          this.noTxns = true;
          this.mBal = 0;
        } else {
          this.noTxns = false;
          this.totalTxn = 0;
          for (let txn of this.allTxns){
            if (txn.Type === "Sale") {
              this.totalTxn = (+this.totalTxn) + (+txn.TotalAmount);
            } else {
              if (txn.Type === "Expense") {
                this.totalTxn = (+this.totalTxn) - (+txn.TotalAmount);
              }
            }
          }
          this.mBal = this.totalTxn;
        }
      });
    }

    if (this.saleBtn) {
      this.transactionProvider.getSalesTxns(ID, YMS, CYM).subscribe( data => {
        this.allTxns = data;
        if (this.allTxns.length === 0) {
          this.noTxns = true;
          this.mBal = 0;
        } else {
          this.noTxns = false;
          this.totalSales = 0;
          for (let txn of this.allTxns){
            this.totalSales = (+this.totalSales) + (+txn.TotalAmount);
          }
          this.mBal = this.totalSales;
        }
      });
    }

    if (this.expBtn) {
      this.transactionProvider.getExpenseTxns(ID, YMS, CYM).subscribe( data => {
        this.allTxns = data;
        if (this.allTxns.length === 0) {
          this.noTxns = true;
          this.mBal = 0;
        } else {
          this.noTxns = false;
          this.totalExp = 0;
          for (let txn of this.allTxns){
            this.totalExp = (+this.totalExp) + (+txn.TotalAmount);
          }
          this.mBal = this.totalExp;
        }
      });
    }

    if (this.unpaidBtn) {
      this.transactionProvider.getSalesTxns(ID, YMS, CYM).subscribe( data => {
        for (let txn of data){
          if (txn.IsPaid != "YES") {
            this.allTxns.push(txn);
          }
        }
        if (this.allTxns.length === 0) {
          this.noTxns = true;
          this.mBal = 0;
        } else {
          this.noTxns = false;
          this.totalUnpaid = 0;
          for (let txn of this.allTxns){
            if (txn.IsPaid != "YES") {
              this.totalUnpaid = (+this.totalUnpaid) + (+txn.UnPaidAmount);
            }
          }
          this.mBal = this.totalUnpaid;
        }
      });
    }

  }

  forward() {
    this.monthStr = this.dfs.monthAdd(this.monthStr, 1);
    this.monthDescription = this.dfs.dateMonthYear(this.monthStr);
    //this.dMonth = this.dfs.monthSlct(this.dMonthStr);
    this.yearMonth = this.dfs.yearMonthSlct(this.monthStr);
    this.activateFwdBtn();

    this.monthReport(this.companyID, 'YearMonth', this.yearMonth);
  }

  backward() {
    this.monthStr = this.dfs.monthSub(this.monthStr, 1);
    this.monthDescription = this.dfs.dateMonthYear(this.monthStr);
    //this.dMonth = this.dfs.monthSlct(this.dMonthStr);
    this.yearMonth = this.dfs.yearMonthSlct(this.monthStr);
    this.activateFwdBtn();

    this.monthReport(this.companyID, 'YearMonth', this.yearMonth);
  }

  fFoward() {

    this.monthStr = this.dfs.dayNowSFS;
    this.monthDescription = this.dfs.dateMonthYear(this.monthStr);
    this.yearMonth = this.dfs.yearMonthSlct(this.monthStr);
    this.activateFwdBtn();

    this.monthReport(this.companyID, 'YearMonth', this.yearMonth)
  }


  activateFwdBtn() {
    this.fwdBtn = false;

      if (this.monthStr != this.dfs.dayNowSFS) {
        this.fwdBtn = true;
      } else  {
        this.fwdBtn = false;
      }
  }

  txnDetails(txn) {

      let myViewTransactionDetailsModal = this.modalCtrl.create('TransactionDetailsViewModalPage', {txn: txn});
    myViewTransactionDetailsModal.present();
    }


  allTxnReport() {
    this.reportDescription = "TRANSACTIONS";
    this.txnBtn = true;
    this.saleBtn = false;
    this.expBtn = false;
    this.unpaidBtn = false;
    this.monthReport(this.companyID, 'YearMonth', this.yearMonth)
  }

  allSalesReport() {
    this.reportDescription = "SALES";
    this.txnBtn = false;
    this.saleBtn = true;
    this.expBtn = false;
    this.unpaidBtn = false;
    this.monthReport(this.companyID, 'YearMonth', this.yearMonth)
  }

  allExpReport() {
    this.reportDescription = "EXPENSES";
    this.txnBtn = false;
    this.saleBtn = false;
    this.expBtn = true;
    this.unpaidBtn = false;
    this.monthReport(this.companyID, 'YearMonth', this.yearMonth)
  }

  allUnpaidReport() {
    this.reportDescription = "UNPAID";
    this.txnBtn = false;;
    this.saleBtn = false;
    this.expBtn = false;
    this.unpaidBtn = true;
    this.monthReport(this.companyID, 'YearMonth', this.yearMonth)
  }


  goToExpensePage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('ExpensePage');
  }

  goToSalesPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('SalesPage');
  }

  goToHomePage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('DashBoardPage');
  }

  goToOutsPymtsPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('OutstandingPaymentSPage');
  }

}
