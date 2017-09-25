import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-address-modal',
  templateUrl: 'address-modal.html',
})
export class AddressModalPage {
  public deliveryForm:FormGroup;
  street1: string = this.navParams.get('Street1');
  street2: string = this.navParams.get('Street2');
  city: string = this.navParams.get('City');
  state: string = this.navParams.get('State');
  country: string = this.navParams.get('Country');


  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl:LoadingController,
              public formBuilder:FormBuilder, public viewCtrl: ViewController) {
    this.deliveryForm = formBuilder.group({
      street1: [this.street1, Validators.required],
      street2: [this.street2],
      city: [this.city, Validators.required],
      state: [this.state, Validators.required],
      country: [this.country, Validators.required]
    });
  }

  ionViewDidLoad() {
  }

  addressLog(): void {
    //const loading = this.loadingCtrl.create();
   // loading.present();
  }

  closeAddressModal() {
    this.viewCtrl.dismiss();
  }

  submitAddressModal() {
    let businessAddressData = {
      Street: this.deliveryForm.value.street1+" ~ "+this.deliveryForm.value.street2,
      City: this.deliveryForm.value.city,
      State: this.deliveryForm.value.state,
      Country: this.deliveryForm.value.country
    };
    this.viewCtrl.dismiss(businessAddressData);

  }
}
