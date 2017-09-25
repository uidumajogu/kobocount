import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-total-discount-modal',
  templateUrl: 'total-discount-modal.html',
})
export class TotalDiscountModalPage {

  totalDiscountType: string;
  totalDiscountAmount: any;
  discountTypeSelected: boolean = false;
  tDiscountPercentage: boolean;
  tDiscountTypeSymbol: string;
  saleSubTotalTDP: any;
  totalDiscount: number = 0;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.saleSubTotalTDP = Number(this.navParams.get('saleSubTotal')) + Number(this.navParams.get('saleDiscount'));
    this.totalDiscountType = this.navParams.get('discountType');
    this.totalDiscountAmount = this.navParams.get('discountAmount');

    if (this.totalDiscountAmount) {
      this.activateDiscountAmountInput();
    }
  }

  activateDiscountAmountInput() {
    this.discountTypeSelected = true;
    if (this.totalDiscountType === "Percentage%") {
      this.tDiscountPercentage = true;
      this.tDiscountTypeSymbol = "%";
    } else {
      this.tDiscountPercentage = false;
      this.tDiscountTypeSymbol = "";
    }
  }

  submitTotalDiscountModal() {
    if (this.totalDiscountAmount === "") {
      this.totalDiscountAmount = 0;
    }
    if ( this.totalDiscountType === "Percentage%" ) {
      this.totalDiscount = (this.totalDiscountAmount/100)*this.saleSubTotalTDP;
    } else {
      this.totalDiscount = this.totalDiscountAmount;
    }

    let generalDiscountData = {
      gDiscountType: this.totalDiscountType,
      gDiscountAmount: this.totalDiscountAmount,
      gDiscount: this.totalDiscount,
    };

    this.viewCtrl.dismiss(generalDiscountData);
  }

  closeTotalDiscountModal() {
    this.viewCtrl.dismiss();
  }

  transform(value: string, ...args) {
    let retNumber = Number(value);
    return isNaN(retNumber) ? 0 : retNumber;
  }

}
