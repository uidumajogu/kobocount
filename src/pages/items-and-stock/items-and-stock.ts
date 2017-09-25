import { Component } from '@angular/core';
import {FabContainer, IonicPage, ModalController, NavController} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {ReportsProvider} from "../../providers/reports/reports";


@IonicPage()
@Component({
  selector: 'page-items-and-stock',
  templateUrl: 'items-and-stock.html',
})
export class ItemsAndStockPage {

  myItemStock: any = "";
  addNewItem: boolean = false;
  addItemInvalid: boolean = false;
  myItemEdit: boolean = false;
  strIte: string = " in stock";
  myItemUnitPrice: any = "";
  editItem: boolean = false;
  bizProfile: any;
  bizItems: any;
  pageLoaded: boolean = false;
  overlayHidden: boolean = true;

  constructor(private navCtrl: NavController, private teamProvider: TeamProvider, private reportsProvider: ReportsProvider,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.bizProfile = this.teamProvider.companyP;
    this.getCompanyItems();
  }

  addMyNewItem() {
    let myItemsModal = this.modalCtrl.create('ItemsAndStockModalPage', {btn1: "Add", btn2: "Clear", allCat: this.bizItems});
    myItemsModal.onDidDismiss((data) => {
      if (data) {}
    });
    myItemsModal.present();
  }

  editMyItem(item, key, category) {
    let length: number = Object.keys(category).length;
    let myItemsModal = this.modalCtrl.create('ItemsAndStockModalPage', {btn1: "Update", btn2: "Delete", items: item, key: key,
                                              catLength: length, allCat: this.bizItems});
    myItemsModal.onDidDismiss((data) => {
      if (data) {}
    });
    myItemsModal.present();
  }

  editCategory(key, items) {
    let myCategoryModal = this.modalCtrl.create('MyCategoryModalPage', {category: key, items: items});
    myCategoryModal.onDidDismiss((data) => {
      if (data) {}
    });
    myCategoryModal.present();

  }

  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }

  getCompanyItems(){
    this.reportsProvider.getItems().subscribe( data => {
      this.bizItems = data;

      if (this.bizItems.length === 0) {
        this.pageLoaded  = true;
      } else {
        this.pageLoaded = false;
      }
    });
  }


  goToExpensePage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('ExpensePage');
  }

  goToSalesPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('SalesPage');
  }

  goToHomePage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('DashBoardPage');
  }

  goToTxnsRepPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('TransactionsPage');
  }

}
