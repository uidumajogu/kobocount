import { Component } from '@angular/core';
import {IonicPage, Keyboard, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {TeamProvider} from "../../providers/team/team";
import {ReportsProvider} from "../../providers/reports/reports";
import {DateFsProvider} from "../../providers/date-fs/date-fs";

//import {datepicker} from 'js-datepicker';


@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  currentDate: any;
  salePrice: any = "";
  saleQty: any = "";
  saleShipping: number = 0;
  saleDiscount: any = "";
  saleVAT: number;
  saleTotal: number;
  customerName: string = "";
  customerPhoneNumber: string = "";
  deliveryDate = "";
  dStreet1: string = "";
  dStreet2: string = "";
  dCity: string = "";
  dState: string = "";
  dCountry: string = "";
  deliveryAddress = "";
  saleAmount: number;
  bizProfile: any;
  saleDay: any;
  saleMonth: any;
  saleYear: string;
  saleDate: string;
  tranTotalYBF: any;
  tranTotalMBF: any;
  tranTotalDBF: any;
  public txnSummaryList: Array<any> = [];
  overlayHidden: boolean;
  toggleFullyPaid: boolean;
  salePaid: string;
  toggleCashSale: boolean;
  toggleChequeSale: boolean;
  toggleTransferSale: boolean;
  paymentMode: string;
  customerEmail: string = "";
  saleItems: Array<{index: number, description: string, quantity: any, unitPrice: any, saleDiscountType: string,
                    saleDiscountTag: boolean, saleDiscountAmount: any, saleDiscount: number, itemClass: boolean,
                    itemCategory: string, itemKey: string}>;
  payments: Array<{paymentDate: any, pAmount: number, pMode: string}>;
  saleSubTotal: number = 0;
  totalSaleDiscount: number = 0;
  paidSaleTotal: number = 0;
  saleTotalDue: number = 0;
  totalDiscountInputInvalid: boolean;
  globalSaleDiscount: number = 0;
  customerDiscount: number;
  generalDiscountType: any;
  generalDiscountAmount: any;
  saleShippingInputInvalid: boolean;
  toggleSaleVATValue: boolean;
  shippingVATTag: boolean;
  saleShippingAddButton: boolean;
  saleGDiscountAddButton: boolean;
  paidSaleConfirmButton: boolean;
  salePaymentInvalid: boolean;
  saleFullyPaid: boolean = false;
  salePaymentDate: any = new Date();
  submitSaleButtonInvalid: boolean;
  saleInRecTag: string;
  saleInRecNumber: string = "";
  openCD: boolean = false;
  openDD: boolean = false;
  smyItems: Array<{index: number, description: string, stock: any, price: any, editFlag: boolean, editPrice: boolean}>;
  dummyCode: boolean = false;
  saleWeekDay: any;
  saleWeek: any;
  userProfile: any;
  saleYearMonth: any;
  paidFull: boolean;
  submitSaleButtonInvalidSaleNFP: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dateFS: DateFsProvider,
              public loadingCtrl: LoadingController, public reportsProvider: ReportsProvider,
              public transactionProvider: TransactionsProvider, public teamProvider: TeamProvider,
              public toastCtrl: ToastController, public keyboard: Keyboard, public modalCtrl: ModalController) {
  }


  ionViewDidLoad() {
    this.userProfile = this.teamProvider.userP;
    this.saleVAT = 0;
    this.saleTotal = 0;
    this.saleAmount = 0;
    this.overlayHidden = true;
    this.toggleFullyPaid = false;
    this.currentDate = this.dateFS.dateNowFS;
    this.toggleCashSale = true;
    this.toggleChequeSale = false;
    this.toggleTransferSale = false;
    this.paymentMode = "Cash";
    this.totalDiscountInputInvalid = false;
    this.toggleSaleVATValue = false;
    this.saleShippingAddButton = true;
    this.saleGDiscountAddButton = true;
    this.paidSaleConfirmButton = true;
    this.salePaymentInvalid = false;
    this.submitSaleButtonInvalid = false;
    this.submitSaleButtonInvalidSaleNFP = false;

    this.saleItems = [
      { index: 0, description: "Add Item", quantity: 1, unitPrice: 0, saleDiscountType: "", saleDiscountTag: false,
        saleDiscountAmount: 0, saleDiscount: 0, itemClass: true, itemCategory: "Uncategorized", itemKey: ""},
    ];

    this.payments = [{paymentDate: this.currentDate, pAmount: 0, pMode: "Cash"}];
  }

  getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}


  openCDButton(){
    this.openCD = !this.openCD;
  }

  openDDButton(){
    this.openDD = !this.openDD;
  }

  openAddSaleItemModal(item) {
    this.totalDiscountInputInvalid = false;
    this.saleShippingInputInvalid = false;
    this.salePaymentInvalid = false;
    this.submitSaleButtonInvalid = false;
    let myAddSaleItemModal = this.modalCtrl.create('AddItemModalPage', item);

    myAddSaleItemModal.onDidDismiss((data) => {
      //this.smyItems = data.mySItems;
        if (data) {
          if (data.saleItemTag === "Add") {
            this.saleItems.splice(
              (this.saleItems.length-1),0,
              {index: this.saleItems.length, description: data.description,
                quantity: data.quantity, unitPrice: data.unitPrice, saleDiscountType: data.saleDiscountType,
                saleDiscountTag: data.saleDiscountTag, saleDiscountAmount: data.saleDiscountAmount,
                saleDiscount: data.saleDiscount, itemClass: false, itemCategory: data.siCategory, itemKey: data.itemKey});
          } else {
            if (data.saleItemTag === "Update") {
              this.saleItems.splice(
                (data.index - 1), 1,
                {index: data.index, description: data.description,
                  quantity: data.quantity, unitPrice: data.unitPrice, saleDiscountType: data.saleDiscountType,
                  saleDiscountTag: data.saleDiscountTag, saleDiscountAmount: data.saleDiscountAmount, saleDiscount: data.saleDiscount,
                  itemClass: false, itemCategory: data.siCategory, itemKey: data.itemKey});
            } else {
              if (data.saleItemTag === "Delete") {
                this.saleItems.splice(
                  (data.index - 1), 1,);
                for (let sale of this.saleItems) {
                  if (sale.index > data.index) {
                    sale.index = sale.index - 1;
                  }
                }
              }
            }
          }
        }
      this.calcTotalSaleDiscount();
      this.calcSaleSubTotal();
      this.calcSaleVAT();
      this.calcSaleTotal();
      this.calcSaleTotalDue();
    });
    myAddSaleItemModal.present();
  }

  calcTotalSaleDiscount() {
    this.totalSaleDiscount = 0;
    for (let discount of this.saleItems) {
      this.totalSaleDiscount += Number(discount.saleDiscount);
    }
    this.customerDiscount = Number(this.totalSaleDiscount) + Number(this.globalSaleDiscount);
    if (this.globalSaleDiscount > 0) {
      this.saleGDiscountAddButton = false;
    } else {
      this.saleGDiscountAddButton = true;
    }

  }

  calcSaleSubTotal() {
    this.saleSubTotal = 0;
    for (let sale of this.saleItems) {
      this.saleSubTotal += (sale.quantity * sale.unitPrice);
    }
    this.saleSubTotal = this.saleSubTotal - this.totalSaleDiscount;
  }

  openTotalDiscountModal() {
    if (this.saleSubTotal === 0) {
      this.totalDiscountInputInvalid = true;
    } else {
      let myTotalDiscountObj = {saleSubTotal: this.saleSubTotal, discountType: this.generalDiscountType,
                                  discountAmount: this.generalDiscountAmount, saleDiscount: this.globalSaleDiscount};
      let myTotalDiscountModal = this.modalCtrl.create('TotalDiscountModalPage', myTotalDiscountObj);

      myTotalDiscountModal.onDidDismiss((data) => {
        if (data) {

          this.generalDiscountType = data.gDiscountType;
          this.generalDiscountAmount = data.gDiscountAmount;
          this.globalSaleDiscount = data.gDiscount;

          this.calcTotalSaleDiscount();
          this.calcSaleSubTotal();
          this.calcSaleVAT();
          this.calcSaleTotal();
          this.calcSaleTotalDue();
        }
      });
      myTotalDiscountModal.present();
    }
  }

  openShippingModal() {

    if ( this.saleSubTotal === 0 ) {
      this.saleShippingInputInvalid = true;
    } else {
      let myShippingObj = {shippingVATTag: this.shippingVATTag, shippingFee: this.saleShipping, customerName: this.customerName,
        customerPhoneNumber: this.customerPhoneNumber, customerEmail: this.customerEmail, dStreet1: this.dStreet1, dStreet2: this.dStreet2,
        dCity: this.dCity, dState: this.dState, dCountry: this.dCountry, deliveryDate: this.deliveryDate};

      let myShippingModal = this.modalCtrl.create('ShippingModalPage', myShippingObj);

      myShippingModal.onDidDismiss((data) => {
        if (data) {
          this.shippingVATTag = data.shippingVATTag;
          this.saleShipping = data.shippingFee;
          this.customerName = data.customerName;
          this.customerPhoneNumber = data.customerPhoneNumber;
          this.customerEmail = data.customerEmail;
          this.dStreet1 = data.sStreet1;
          this.dStreet2 = data.sStreet2;
          this.dCity = data.sCity;
          this.dState = data.sState;
          this.dCountry = data.sCountry;
          this.deliveryDate =  data.deliveryDate;

          this.calcTotalSaleDiscount();
          this.calcSaleSubTotal();
          this.calcSaleVAT();
          this.calcSaleTotal();
          this.calcSaleTotalDue();

          if (this.saleShipping > 0) {
            this.saleShippingAddButton = false;
          } else{
            this.saleShippingAddButton = true;
          }
        }
      });
      myShippingModal.present();
    }
  }

  calcSaleVAT() {
    this.saleVAT = (this.saleSubTotal - this.globalSaleDiscount) * (5/100) * Number(this.toggleSaleVATValue);
    this.calcSaleTotal();
    this.calcSaleTotalDue();
  }

  calcSaleTotal() {
    this.saleTotal = 0;
    this.saleTotal = this.saleSubTotal + this.saleShipping - this.globalSaleDiscount + this.saleVAT;
  }

  openPaidSaleModal() {

    if ( this.saleTotal === 0 ) {
      this.salePaymentInvalid = true;
    } else {
      let myPaymentObj = {saleTotal: this.saleTotal, fullyPaid: this.saleFullyPaid,
                          salePaymentMode: this.paymentMode, paidSaleTotal: this.paidSaleTotal,
                          salePaymentDate: this.salePaymentDate, paymentMade: this.payments};

      let myPaymentModal = this.modalCtrl.create('PaidSaleModalPage', myPaymentObj);

      myPaymentModal.onDidDismiss((data) => {
        if (data) {

          this.paidSaleTotal = data.salePaymentAmount;
          this.saleFullyPaid = data.fullyPaid;
          this.salePaymentDate = data.salePaymentDate;
          this.payments = data.salePayments;

          console.log(this.payments);

          this.calcTotalSaleDiscount();
          this.calcSaleSubTotal();
          this.calcSaleVAT();
          this.calcSaleTotal();
          this.calcSaleTotalDue();

          if (this.paidSaleTotal > 0) {
            this.paidSaleConfirmButton = false;
          } else{
            this.paidSaleConfirmButton = true;
          }
        }
      });
      myPaymentModal.present();
    }
  }

  calcSaleTotalDue() {
    this.saleTotalDue = 0;
    this.saleTotalDue = this.saleTotal - this.paidSaleTotal;
  }


  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }


  updateMyItemsStockInDB() {
    //this.reportsProvider.addItems(this.bizProfile.companyAdmin, this.smyItems);
  }



  saleDateString() {
    this.saleYear = this.dateFS.yearNowFS;
    this.saleMonth = this.dateFS.monthNowFS;
    this.saleDay = this.dateFS.dayNowFS;
    this.saleDate = this.dateFS.dateNowFS;
    this.saleYearMonth = this.dateFS.yearMonthNowFS;
    this.saleWeekDay = this.dateFS.dayNowFS;
    this.saleWeek = this.dateFS.weekNowFS;
  }


  updatePayment() {
      this.payments = [
        {paymentDate: this.saleDate, pAmount: this.paidSaleTotal, pMode: this.paymentMode}];
  }


  updateTransaction() {
    if (this.saleFullyPaid === true){
      this.salePaid = "YES";
      this.paidFull = true;
      //this.updatePayment();
    } else {
      if (this.paidSaleTotal === 0) {
        this.salePaid = "NO";
        this.paidFull = false;
        //this.updatePayment();
      } else {
        this.salePaid = "PARTIAL";
        this.paidFull = false;
       // this.updatePayment();
      }
    }

    this.transactionProvider.addTransaction("Sale", this.saleInRecNumber, this.saleDate,
      this.saleYear, this.saleMonth, this.saleYearMonth, this.saleDay, this.saleWeekDay, this.saleWeek, this.saleItems, this.saleSubTotal,
      this.globalSaleDiscount, this.saleShipping, this.saleVAT, this.saleTotal, this.paidSaleTotal, this.saleTotalDue, this.paymentMode,
      this.customerName, this.customerPhoneNumber, this.customerEmail, this.deliveryDate, this.deliveryAddress, this.salePaid, this.paidFull,
      this.userProfile.email, this.userProfile.fullName, this.userProfile.companyId, this.payments);

      this.transactionProvider.addSale("Sale", this.saleInRecNumber, this.saleDate,
        this.saleYear, this.saleMonth, this.saleYearMonth, this.saleDay, this.saleWeekDay, this.saleWeek, this.saleItems, this.saleSubTotal,
        this.globalSaleDiscount, this.saleShipping, this.saleVAT, this.saleTotal, this.paidSaleTotal, this.saleTotalDue, this.paymentMode,
        this.customerName, this.customerPhoneNumber, this.customerEmail, this.deliveryDate, this.deliveryAddress, this.salePaid, this.paidFull,
        this.userProfile.email, this.userProfile.fullName, this.userProfile.companyId, this.payments);
      }

  submitSale() {

    if (this.saleTotal === 0) {
      this.submitSaleButtonInvalid = true;
    } else {
      if (this.saleTotalDue != 0) {
        if (this.customerName === "" || this.customerPhoneNumber === "") {
          this.submitSaleButtonInvalidSaleNFP = true;
          this.openCDButton();
        } else {
          this.addSaleToDB();
        }
      } else {
        this.addSaleToDB();
        }
    }
  }

  addSaleToDB() {

    this.saleDateString();
    if (this.saleInRecNumber === "") {
      var saleInRedid = (new Date().getTime().valueOf() + Math.random());
      this.saleInRecNumber = "INV" + parseInt(String(saleInRedid));
    }
    if (this.saleTotalDue === 0) {
      this.saleInRecTag = "Receipt";
    } else {
      this.saleInRecTag = "Invoice";
    }

    let mySaveSaleData = {saleInRecTag: this.saleInRecTag};

    let mySaveSaleModal = this.modalCtrl.create('SaveSaleModalPage', mySaveSaleData);

    mySaveSaleModal.onDidDismiss((data) => {
      if (data) {
        if (data === "GenerateIR") {
          const loading = this.loadingCtrl.create({
            content: "Generating " + this.saleInRecTag + "...."
          });
          loading.present();
          this.generateSaleIR();
          loading.dismiss();
        } else {
          const loading = this.loadingCtrl.create({
            content: "Saving Sale...."
          });
          loading.present();
          this.saleItems.pop();
          this.updateTransaction();
          loading.dismiss().then(() => {
            this.navCtrl.setRoot('SalesPage');
          });
        }
      }
    });
    mySaveSaleModal.present();
  }

  generateSaleIR() {

      let mySaleData = {saleInRecTag: this.saleInRecTag, saleInRecNumber: this.saleInRecNumber, customerName: this.customerName,
                        customerPhoneNumber: this.customerPhoneNumber, customerEmail: this.customerEmail, dStreet1: this.dStreet1,
                        dStreet2: this.dStreet2, dCity: this.dCity, dState: this.dState, dCountry: this.dCountry, saleInReDate: this.currentDate,
                        saleItems: this.saleItems, saleVAT: this.saleVAT, saleShipping: this.saleShipping, paidSaleTotal: this.paidSaleTotal,
                        dDate: this.deliveryDate, totalSaleDiscount: this.totalSaleDiscount, globalSaleDiscount: this.globalSaleDiscount,
                        saleSubTotal: this.saleSubTotal, paymentMode: this.paymentMode, salePaymentDate: this.salePaymentDate};

      this.navCtrl.push('SaleInvoiceOrReceiptPage', mySaleData);

  }

  cancelSale() {
    this.saleItems.pop();
    var myItemStock;
    for (let item of this.saleItems) {
      this.reportsProvider.getItemStock(this.userProfile.companyId, item.itemCategory, item.itemKey).then(itemsRem => {
        myItemStock = itemsRem + +item.quantity;
      }).then(() => {
        this.reportsProvider.updateItemStock(this.userProfile.companyId, myItemStock, item.itemCategory, item.itemKey).then(() => {
        });
      });
    }
    this.navCtrl.setRoot('SalesPage');
  }

  goToTransactionsPage() {
    this.navCtrl.setRoot('TransactionsPage');
  }

  goToExpensePage() {
    this.navCtrl.setRoot('ExpensePage');
  }

  goToHomePage() {
    this.navCtrl.setRoot('DashBoardPage');
  }


}
