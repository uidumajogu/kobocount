import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-category-pop-over',
  templateUrl: 'item-category-pop-over.html',
})
export class ItemCategoryPopOverPage {

  allMyCat: any;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.allMyCat = this.navParams.get('allMyCat');
  }

  ionViewDidLoad() {
  }

  selectedCategory(cat) {
    this.viewCtrl.dismiss(cat);
  }

}
