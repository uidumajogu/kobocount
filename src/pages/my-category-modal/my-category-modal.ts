import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {ReportsProvider} from "../../providers/reports/reports";


@IonicPage()
@Component({
  selector: 'page-my-category-modal',
  templateUrl: 'my-category-modal.html',
})
export class MyCategoryModalPage {

  myCategory: string = "";
  newCategory: string = "";
  editCategoryInvalid: boolean;
  bizProfile: any;
  catAction: string;
  items: any;
  catItems: any;

  constructor(private navParams: NavParams, private viewCtrl: ViewController, private toastCtrl: ToastController,
              private teamProvider: TeamProvider, private reportsProvider: ReportsProvider) {
  }

  ionViewDidLoad() {
    this.bizProfile = this.teamProvider.companyP;
    this.myCategory = this.navParams.get('category');
    this.newCategory = this.myCategory;
    this.items = this.navParams.get('items');
    this.catItems = Object.keys(this.items).map(key => this.items[key]);
  }

  editCategory() {
    this.catAction = "Edit";
    if (this.newCategory === "" || !this.newCategory) {
      this.viewCtrl.dismiss();
    } else {
      if (this.newCategory === this.myCategory) {
        this.viewCtrl.dismiss();
      } else {
        this.reportsProvider.updateCategory(this.bizProfile.companyAdmin, this.myCategory, this.newCategory, this.catItems);
        this.presentToast();
        this.viewCtrl.dismiss();
      }
    }
  }

  deleteCategory() {
    this.catAction = "Delete";
    if (this.newCategory === "" || !this.newCategory) {
      this.viewCtrl.dismiss();
    } else {
      if (this.newCategory === this.myCategory) {
        this.reportsProvider.removeCategory(this.bizProfile.companyAdmin, this.myCategory).then(()=> {
        this.presentToast();
        this.viewCtrl.dismiss();
        });
      } else {
        this.viewCtrl.dismiss();
      }
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.myCategory + ' Category has been ' + this.catAction + 'd',
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      dismissOnPageChange: true
    });
    toast.present();
  }


  closeEditCategoryModal() {
    this.viewCtrl.dismiss();
  }

}
