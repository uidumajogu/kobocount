import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {DateFsProvider} from "../../providers/date-fs/date-fs";



@IonicPage()
@Component({
  selector: 'page-paid-sale-modal',
  templateUrl: 'paid-sale-modal.html',
})
export class PaidSaleModalPage {

  salePartialPayment: any = "";
  toggleFullyPaidValue: boolean = false;
  salePaymentAmount: any;
  salePayment: boolean = false;
  toggleSalePaidByCash: boolean = true;
  toggleSalePaidByTransfer: boolean = false;
  toggleSalePaidByPOS: boolean = false;
  salePaymentMode: string = "Cash";
  totalSaleAmount: number;
  salePaymentDate: any = new Date();
  paymentDetails: Array<{paymentDate: any, pAmount: number, pMode: string}>;
  salePaidAmount: number;
  pAmountTotal: number = 0;
  paymentEdit: number = 0;



  constructor(private navParams: NavParams, private vCtrl: ViewController, private dfs: DateFsProvider) {
  }

  ionViewDidLoad() {
    this.totalSaleAmount = this.navParams.get('saleTotal');
    this.toggleFullyPaidValue = this.navParams.get('fullyPaid');
    this.salePaymentMode = this.navParams.get('salePaymentMode');
    this.salePaymentAmount = this.navParams.get('paidSaleTotal');
    this.salePaymentDate = this.navParams.get('salePaymentDate');
    this.paymentDetails = this.navParams.get('paymentMade');

    for (let pymt of this.paymentDetails) {
      this.pAmountTotal = this.pAmountTotal + pymt.pAmount;
    }

    if (this.toggleFullyPaidValue === true) {
      this.salePayment = true;
    } else {
      if (this.salePaymentAmount > 0) {
        this.salePayment = true;
        this.salePartialPayment = this.salePaymentAmount;
      }
    }

    if (this.salePaymentMode === "Transfer") {
      this.toggleSalePaidByCash = false;
      this.toggleSalePaidByTransfer = true;
      this.toggleSalePaidByPOS = false;
    } else {
      if (this.salePaymentMode === "POS") {
        this.toggleSalePaidByCash = false;
        this.toggleSalePaidByTransfer = false;
        this.toggleSalePaidByPOS = true;
      } else {
        this.toggleSalePaidByCash = true;
        this.toggleSalePaidByTransfer = false;
        this.toggleSalePaidByTransfer = false;
      }
    }
  }

  calcFullyPaid() {
    this.salePayment = this.toggleFullyPaidValue;

    if (this.toggleFullyPaidValue) {
      if (this.pAmountTotal === 0) {
        this.salePaidAmount = this.totalSaleAmount;
        this.paymentDetails[this.paymentDetails.length - 1] = {
          paymentDate: this.dfs.dateNowFS,
          pAmount: this.salePaidAmount,
          pMode: this.salePaymentMode
        };
        this.pAmountTotal = this.pAmountTotal + this.paymentDetails[this.paymentDetails.length - 1].pAmount;
      } else {
          this.salePaidAmount = this.totalSaleAmount - this.pAmountTotal;
          this.paymentDetails[this.paymentDetails.length] = {
            paymentDate: this.dfs.dateNowFS,
            pAmount: this.salePaidAmount,
            pMode: this.salePaymentMode
          };
          this.pAmountTotal = this.pAmountTotal + this.paymentDetails[this.paymentDetails.length - 1].pAmount;
      }
    } else {
      if (this.paymentDetails.length === 1) {
        this.pAmountTotal = 0;
        this.salePaidAmount = 0;
        this.paymentDetails[this.paymentDetails.length - 1] = {
          paymentDate: this.dfs.dateNowFS,
          pAmount: this.salePaidAmount,
          pMode: this.salePaymentMode
        };
      } else {
        this.pAmountTotal = this.pAmountTotal - this.paymentDetails[this.paymentDetails.length - 1].pAmount;
        this.paymentDetails.pop();
      }
    }
  }

  calcPartiallyPaid() {
    this.salePayment = true;
    this.salePaidAmount = Number(this.salePartialPayment);

    if (this.pAmountTotal === 0) {
      this.paymentDetails[this.paymentDetails.length - 1] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
      this.pAmountTotal = this.pAmountTotal + this.paymentDetails[this.paymentDetails.length - 1].pAmount;
      this.paymentEdit = 1;
    } else {
      if (this.paymentEdit === 0) {
        this.paymentDetails[this.paymentDetails.length] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
        this.pAmountTotal = this.pAmountTotal + this.paymentDetails[this.paymentDetails.length - 1].pAmount;
        this.paymentEdit = 1;
      } else {
        this.pAmountTotal = this.pAmountTotal - this.paymentDetails[this.paymentDetails.length - 1].pAmount;
        this.paymentDetails[this.paymentDetails.length - 1] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
        this.pAmountTotal = this.pAmountTotal + this.paymentDetails[this.paymentDetails.length - 1].pAmount;
      }
    }
  }

  evaluatePaymentModeCash() {
    this.toggleSalePaidByCash = !this.toggleSalePaidByCash;
    if (this.toggleSalePaidByCash === true ) {
      this.toggleSalePaidByTransfer = false;
      this.toggleSalePaidByPOS = false;
      this.salePaymentMode = "Cash";

      this.paymentDetails[this.paymentDetails.length - 1] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
    }
  }

  evaluatePaymentModeTransfer() {
    this.toggleSalePaidByTransfer = !this.toggleSalePaidByTransfer;
    if (this.toggleSalePaidByTransfer === true ) {
      this.toggleSalePaidByCash = false;
      this.toggleSalePaidByPOS = false;
      this.salePaymentMode = "Transfer";

      this.paymentDetails[this.paymentDetails.length - 1] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
    }
  }

  evaluatePaymentModePOS() {
    this.toggleSalePaidByPOS = !this.toggleSalePaidByPOS;
    if (this.toggleSalePaidByPOS === true ) {
      this.toggleSalePaidByCash = false;
      this.toggleSalePaidByTransfer = false;
      this.salePaymentMode = "POS";

      this.paymentDetails[this.paymentDetails.length - 1] = {paymentDate: this.dfs.dateNowFS, pAmount: this.salePaidAmount, pMode: this.salePaymentMode};
    }
  }

  submitPaymentModal() {

    let salePaymentData = {
      salePaymentAmount: this.pAmountTotal,
      fullyPaid: this.toggleFullyPaidValue,
      salePayments: this.paymentDetails
    };
    console.log(salePaymentData);
    this.vCtrl.dismiss(salePaymentData);
  }

  closePaymentModal() {
    this.vCtrl.dismiss();
  }

}
