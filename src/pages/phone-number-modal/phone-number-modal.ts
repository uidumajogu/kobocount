import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-phone-number-modal',
  templateUrl: 'phone-number-modal.html',
})
export class PhoneNumberModalPage {
  //public phoneNum: string = "";
  phoneNum: string = this.navParams.get('PhoneNumber');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {

  }

  closePhoneNumberModal() {
    this.phoneNum = "";
    this.viewCtrl.dismiss(this.phoneNum);
  }

  submitPhoneNumberModal() {
    console.log(this.phoneNum)
    this.viewCtrl.dismiss(this.phoneNum);
  }


}
