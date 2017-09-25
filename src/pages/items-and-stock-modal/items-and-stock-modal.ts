import { Component } from '@angular/core';
import {IonicPage, NavParams, PopoverController, ToastController, ViewController} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {ReportsProvider} from "../../providers/reports/reports";


@IonicPage()
@Component({
  selector: 'page-items-and-stock-modal',
  templateUrl: 'items-and-stock-modal.html',
})
export class ItemsAndStockModalPage {

  headerDescription: string;
  myItemDescription: string = "";
  myItemStock: string = "";
  myItemUnitPrice: string = "";
  addItemInvalid: boolean;
  bizProfile: any;
  myItemCategory: string = "";
  btnOne: string;
  btnTwo: string;
  itemKey: any;
  myItems: any;
  itemCategoryLength: number;
  allCategory: any;

  constructor(private navParams: NavParams, private teamProvider: TeamProvider, private reportsProvider: ReportsProvider,
              private viewCtrl: ViewController, private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.bizProfile = this.teamProvider.companyP;
    this.btnOne = this.navParams.get('btn1');
    this.btnTwo = this.navParams.get('btn2');
    this.itemKey = this.navParams.get('key');
    this.myItems = this.navParams.get('items');
    this.itemCategoryLength = this.navParams.get('catLength');
    this.allCategory = this.navParams.get('allCat');

    if (this.myItems) {
      this.myItemDescription = this.myItems.description;
      this.myItemStock = this.myItems.stock;
      this.myItemUnitPrice = this.myItems.unitPrice;
      this.myItemCategory = this.myItems.category;
    }

    if (this.btnOne === "Add") {
      this.headerDescription = "Add New Item";
    } else {
      this.headerDescription = "Edit Item";
    }
  }


  myItemsBtn1(b1) {

    if (b1 === "Add") {

    if (this.myItemCategory === "") {
      this.myItemCategory = "Uncategorized"
    }
    if (this.myItemDescription === "") {
      this.addItemInvalid = true;
    } else {
        this.reportsProvider.addItems(this.bizProfile.companyAdmin, this.myItemDescription, this.myItemStock,
                                      this.myItemUnitPrice, this.myItemCategory, true).then(()=> {
          let toast = this.toastCtrl.create({
            message: this.myItemDescription +' has been added to your Items',
            duration: 3000,
            position: 'top',
            showCloseButton: true,
            dismissOnPageChange: true
          });
          toast.present();

          this.viewCtrl.dismiss();
        });
      }
    } else {
      if (b1 === "Update") {
        this.reportsProvider.updateItems(this.bizProfile.companyAdmin, this.myItemDescription, this.myItemStock,
          this.myItemUnitPrice, this.myItemCategory, true, this.itemKey).then(()=> {
          let toast = this.toastCtrl.create({
            message: this.myItemDescription +' has been edited',
            duration: 3000,
            position: 'top',
            showCloseButton: true,
            dismissOnPageChange: true
          });
          toast.present();

          this.viewCtrl.dismiss();
        });
      }
    }
  }


  myItemsBtn2(b2) {

    if (b2 === "Clear") {
      this.myItemDescription = "";
      this.myItemStock = "";
      this.myItemUnitPrice = "";
    } else {
      if (b2 === "Delete") {

        if (this.itemCategoryLength === 1 && this.myItemCategory === "Uncategorized" ) {
          this.reportsProvider.removeCategory(this.bizProfile.companyAdmin, this.myItemCategory).then(()=> {
            let toast = this.toastCtrl.create({
              message: 'Item has been removed',
              duration: 3000,
              position: 'top',
              showCloseButton: true,
              dismissOnPageChange: true
            });
            toast.present();

            this.viewCtrl.dismiss();
          });
        } else {
          if (this.itemCategoryLength === 1) {
            this.reportsProvider.deleteItems(this.bizProfile.companyAdmin, this.myItemCategory, false, this.itemKey).then(()=> {
              let toast = this.toastCtrl.create({
                message: this.myItemDescription +' has been deleted',
                duration: 3000,
                position: 'top',
                showCloseButton: true,
                dismissOnPageChange: true
              });
              toast.present();

              this.viewCtrl.dismiss();
            });
          } else {
            this.reportsProvider.removeItems(this.bizProfile.companyAdmin, this.myItemCategory, this.itemKey).then(()=> {
              let toast = this.toastCtrl.create({
                message: this.myItemDescription +' has been removed',
                duration: 3000,
                position: 'top',
                showCloseButton: true,
                dismissOnPageChange: true
              });
              toast.present();

              this.viewCtrl.dismiss();
            });
          }
        }
      }
    }

  }

  presentCategoryPopover() {
    let categoryPopover = this.popoverCtrl.create('ItemCategoryPopOverPage', {allMyCat: this.allCategory});

    categoryPopover.onDidDismiss((data) => {
      if (data) {
        this.myItemCategory = data;
      }
    });

    categoryPopover.present();
  }

  closeAddItemModal() {
    this.viewCtrl.dismiss();
  }

}
