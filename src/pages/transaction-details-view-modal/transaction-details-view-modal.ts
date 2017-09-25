import { Component } from '@angular/core';
import {IonicPage, ModalController, NavParams, ViewController} from 'ionic-angular';
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {TeamProvider} from "../../providers/team/team";
import {DateFsProvider} from "../../providers/date-fs/date-fs";


@IonicPage()
@Component({
  selector: 'page-transaction-details-view-modal',
  templateUrl: 'transaction-details-view-modal.html',
})
export class TransactionDetailsViewModalPage {

  txnItems: any;
  txn: any;
  txnSubTotal: any;
  txnGDiscount: any;
  txnVAT: any;
  txnShippingFee: any;
  txnPaidTotal: any;
  txnDate: any;
  txnType: any;
  txnID: any;
  txnPaymentMode: any;
  outsTxnPage: boolean = false;
  saleTotal: any;
  paymentMode: any;
  paidSaleTotal: any;
  salePaymentDate: any;
  saleFullyPaid: boolean = false;
  salePaid: any;
  unPaidAmount: any;
  txnKey: any;
  companyID: any;
  userProfile: any;
  saleKey: any;
  unpaidKey: any;
  paidInFull: boolean;
  paidPayments: Array<{paymentDate: any, pAmount: number, pMode: string}>;
  salePaymentMade: number = 0;
  currentDate: any;

  constructor(private navParams: NavParams,  private vwCtrl: ViewController,
              private modalCtrl: ModalController, private transactionProvider: TransactionsProvider,
              private teamProvider: TeamProvider, private dfs: DateFsProvider) {

  }

  ionViewDidLoad() {

    this.userProfile = this.teamProvider.userP;
    this.companyID = this.userProfile.companyId;

    this.txn = this.navParams.get('txn');
    this.outsTxnPage = this.navParams.get('opp');
    this.txnItems = this.txn.Items;
    this.txnSubTotal = +this.txn.SubTotal;
    this.txnGDiscount = +this.txn.GlobalDiscount;
    this.txnVAT = +this.txn.VAT;
    this.txnShippingFee = +this.txn.ShippingFee;
    this.txnPaidTotal = +this.txn.PaidAmount;
    this.txnDate = this.txn.Date;
    this.txnType = this.txn.Type;
    this.txnID = this.txn.ID;
    this.txnPaymentMode = this.txn.PaymentMode;
    this.saleTotal = this.txn.TotalAmount;
    this.paymentMode = this.txn.PaymentMode;
    this.paidSaleTotal = this.txn.PaidAmount;
    this.salePaymentDate = this.txn.Date;
    this.saleFullyPaid = false;
    this.unpaidKey = this.txn.$key;
    this.paidPayments = this.txn.payments;
    this.currentDate = this.dfs.dateNowFS;

    if(this.paidPayments) {
      this.paidPayments = this.txn.payments;
    } else {
      this.paidPayments = [{paymentDate: this.currentDate, pAmount: 0, pMode: "Cash"},];
    }

  }


  updatePayment() {

    let myOutsPaymentObj = {saleTotal: this.saleTotal, fullyPaid: this.saleFullyPaid,
      salePaymentMode: "Cash", paidSaleTotal: 0,
      salePaymentDate: this.salePaymentDate, paymentMade: this.paidPayments};

      let myOutsPaymentModal = this.modalCtrl.create('PaidSaleModalPage', myOutsPaymentObj);

    myOutsPaymentModal.onDidDismiss((data) => {
        if (data) {
          this.paidSaleTotal = data.salePaymentAmount;
          this.saleFullyPaid = data.fullyPaid;
          this.salePaymentDate = data.salePaymentDate;
          this.paidPayments = data.salePayments;

          this.unPaidAmount = this.saleTotal - this.paidSaleTotal;

          if (this.saleFullyPaid === true){
            this.salePaid = "YES";
            this.paidInFull = true;
          } else {
            if (this.paidSaleTotal === 0) {
              this.salePaid = "NO";
              this.paidInFull = false;
            } else {
              this.salePaid = "PARTIAL";
              this.paidInFull = false;
            }
          }
          this.updateSale();
        }
      this.closeTViewModal();
      });
    myOutsPaymentModal.present();
  }


  updateSale() {
    this.transactionProvider.getAllTxns(this.companyID, "ID", this.txnID).subscribe( data => {
      for (let txn of data) {
        this.txnKey = txn.$key;
      }

      this.transactionProvider.getSalesTxns(this.companyID, "ID", this.txnID).subscribe( data => {
        for (let txn of data) {
          this.saleKey = txn.$key;
        }

        this.transactionProvider.updateTransactionPymt(this.paidSaleTotal, this.unPaidAmount, this.paymentMode, this.salePaid,
          this.paidInFull, this.companyID, this.txnKey, this.paidPayments);

        this.transactionProvider.updateSalePymt(this.paidSaleTotal, this.unPaidAmount, this.paymentMode, this.salePaid,
          this.paidInFull, this.companyID, this.saleKey, this.paidPayments);
      });
    });
  }

  closeTViewModal() {
    this.vwCtrl.dismiss();
  }

}
