import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-save-sale-modal',
  templateUrl: 'save-sale-modal.html',
})
export class SaveSaleModalPage {

  saleIRTag: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.saleIRTag = this.navParams.get('saleInRecTag');
  }

  generateIR() {
    this.viewCtrl.dismiss("GenerateIR");
  }

  SaveSale() {
    this.viewCtrl.dismiss("SaveSale");
  }

  closeSaveSaleModal() {
    this.viewCtrl.dismiss();
  }


}
