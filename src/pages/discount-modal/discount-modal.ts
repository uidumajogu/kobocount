import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-discount-modal',
  templateUrl: 'discount-modal.html',
})
export class DiscountModalPage {

  myDiscountType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {}

  submitDiscountModal() {
    this.viewCtrl.dismiss(this.myDiscountType);
  }

}
