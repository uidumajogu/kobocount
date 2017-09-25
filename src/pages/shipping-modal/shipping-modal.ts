import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-shipping-modal',
  templateUrl: 'shipping-modal.html',
})
export class ShippingModalPage {

  saleShippingFee: any;
  saleShippingCustomerName: any;
  saleShippingCustomerPhoneNumber: any;
  saleShippingCustomerEmail: any;
  saleShippingDeliveryDate: any;
  shippingVAT: number = 0;
  toggleShippingVATValue: boolean;
  saleShippingFeeTotal: number = 0;
  sStreet1: string = "";
  sStreet2: string = "";
  sCity: string = "";
  sState: string = "";
  sCountry: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.toggleShippingVATValue = this.navParams.get('shippingVATTag');
    this.saleShippingFee = this.navParams.get('shippingFee');
    this.saleShippingCustomerName = this.navParams.get('customerName');
    this.saleShippingCustomerPhoneNumber = this.navParams.get('customerPhoneNumber');
    this.saleShippingCustomerEmail = this.navParams.get('customerEmail');
    this.sStreet1 = this.navParams.get('dStreet1');
    this.sStreet2 = this.navParams.get('dStreet2');
    this.sCity= this.navParams.get('dCity');
    this.sState = this.navParams.get('dState');
    this.sCountry = this.navParams.get('dCountry');
    this.saleShippingDeliveryDate = this.navParams.get('deliveryDate');
    this.preloadShippingDetails();
  }

  preloadShippingDetails() {
    if (this.saleShippingFee === 0){
      this.saleShippingFee = "";
    }
  }

  calcShippingVAT() {
    this.shippingVAT = (Number(this.saleShippingFee) * 5/100) * Number(this.toggleShippingVATValue);
  }

  calcShippingFee() {
    this.saleShippingFeeTotal = Number(this.saleShippingFee) + this.shippingVAT;
  }

  submitShippingModal() {
    this.calcShippingFee();
    let saleShippingData = {
      shippingVATTag: this.toggleShippingVATValue,
      shippingFee: this.saleShippingFeeTotal,
      customerName: this.saleShippingCustomerName,
      customerPhoneNumber: this.saleShippingCustomerPhoneNumber,
      customerEmail: this.saleShippingCustomerEmail,
      sStreet1: this.sStreet1,
      sStreet2: this.sStreet2,
      sCity: this.sCity,
      sState: this.sState,
      sCountry: this.sCountry,
      deliveryDate: this.saleShippingDeliveryDate,
    };
    this.viewCtrl.dismiss(saleShippingData);
  }


  closeShippingModal() {
    this.viewCtrl.dismiss();
  }

}
