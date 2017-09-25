import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-popover',
  templateUrl: 'item-popover.html',
})
export class ItemPopoverPage {

  myItems: any;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.myItems = this.navParams.get('allMyItems');
  }

  selectedItem(item, key, category) {

    let mySaleData = {
      desc: item.description,
      cost: item.unitPrice,
      category: category,
      key: key,
      stock: item.stock,
    };

    this.viewCtrl.dismiss(mySaleData);
  }

}
