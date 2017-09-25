import {Component} from '@angular/core';
import {IonicPage, ModalController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {ReportsProvider} from "../../providers/reports/reports";
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-add-item-modal',
  templateUrl: 'add-item-modal.html',
})
export class AddItemModalPage {

  private siDescription: string;
  private siQuantity: any;
  private siUnitPrice: any;
  private siTotalPrice: number;
  private descriptionValid: boolean;
  private unitPriceValid: boolean;
  private saleItemUpdate: boolean;
  private saleItemSave: boolean;
  private saleItemAction: string;
  private saleItemIndex: number;
  private siDiscountAmount: any;
  private discountType: string;
  private discountInput: boolean;
  private percentageTag: boolean;
  private selectItemButton: boolean;
  private changeItemButton: boolean;
  private totalPriceValid: boolean;
  private saleDiscountType: string;
  private siDiscount: number;
  private aiBizItems: any;
  private itemsLoaded: boolean = false;
  private siCategory: string
  private // dReadOnly: boolean = true;
  private isNewItem: boolean = false;
  private bizProfile: any;
  private aiMyItems: Array<{index: number, description: string, stock: any, price: any, editFlag: boolean, editPrice: boolean}>;
  private myItemKey: any;
  private myItemStock: any;
  private myItemQtyBF: any;


  constructor(private navParams: NavParams, private viewCtrl: ViewController, private modalCtrl: ModalController,
              private reportsProvider: ReportsProvider, private teamProvider: TeamProvider, private popoverCtrl: PopoverController) {
    this.siTotalPrice = this.siQuantity * this.siUnitPrice;
  }

  ionViewDidLoad() {
    this.bizProfile = this.teamProvider.companyP;
    this.saleItemIndex = this.navParams.get('index');
    this.siDescription = this.navParams.get('description');
    this.siQuantity = this.navParams.get('quantity');
    this.siUnitPrice = this.navParams.get('unitPrice');
    this.siDiscount = this.navParams.get('saleDiscount');
    this.saleDiscountType = this.navParams.get('saleDiscountType');
    this.percentageTag = this.navParams.get('saleDiscountTag');
    this.siDiscountAmount = this.navParams.get('saleDiscountAmount');
    this.siCategory = this.navParams.get('itemCategory');
    this.myItemKey = this.navParams.get('itemKey');
    this.siTotalPrice = this.siQuantity * this.siUnitPrice;
    this.myItemQtyBF = this.siQuantity;
    this.checkDiscountTag();
    this.preloadSale();
    this.saleItemButtons();
    this.descriptionValid = true;
    this.unitPriceValid = true;
    this.totalPriceValid = true;
    this.selectItemButton = false;
    this.changeItemButton = false;
    this.getCompanyItems();
  }


  getCompanyItems(){
    this.reportsProvider.getItems().subscribe( data => {
      this.aiBizItems = data;
    });
  }

  presentMyItemsPopover() {
    let myItemPopover = this.popoverCtrl.create('ItemPopoverPage', {allMyItems: this.aiBizItems});

    myItemPopover.onDidDismiss((data) => {
      if (data) {
        this.siDescription = data.desc;
        this.siUnitPrice = data.cost;
        this.siCategory = data.category;
        this.myItemKey = data.key;
        this.myItemStock = data.stock;
      }
    });

    myItemPopover.present();
  }


  preloadSale(){
    if (this.siDescription === "Add Item") {
      this.siDescription = "";
      this.siQuantity = 1;
      this.siUnitPrice = "";
      this.siTotalPrice = 0;
      this.siDiscountAmount = "";
      this.siDiscount = 0;
      this.percentageTag = false;
      this.saleDiscountType = "";
      this.discountType = "";
      this.discountInput = false;
      this.siCategory = "Uncategorized";
      this.myItemKey = "";
      this.myItemQtyBF = 0;
    }
  }


  checkDiscountTag() {
    if (this.saleDiscountType === "") {
      this.discountType = "Flat Amount";
      this.discountInput = true;
    } else{
      this.discountType = "Percentage%";
      this.discountInput = true;
    }
  }

  saleItemButtons() {
    if (this.siDescription === "") {
      this.saleItemSave = true;
      this.saleItemUpdate = false;
    } else {
      if (this.siDescription != "") {
        this.saleItemSave = false;
        this.saleItemUpdate = true;
      }
    }
  }

  activateAddItemButton() {
    if (this.siDescription != "") {
      this.itemsLoaded = false;
      this.selectItemButton = true;
      this.descriptionValid = true;
      this.unitPriceValid = true;
      this.totalPriceValid = true;
    }
  }

  checkInvalids() {
    this.descriptionValid = true;
    this.unitPriceValid = true;
    this.totalPriceValid = true;
  }

  openDiscountModal(){
    let myDiscountModal = this.modalCtrl.create('DiscountModalPage');
    myDiscountModal.onDidDismiss((data) => {
      if (data) {
        this.discountType = data;
        this.discountInput = true;

        if (data === "Percentage%") {
          this.percentageTag = true;
          this.saleDiscountType = "%"
        } else {
          if (data === "Flat Amount") {
            this.percentageTag = false;
            this.saleDiscountType = ""
          } else {
            this.discountInput = false;
          }
        }
      }
    });
    myDiscountModal.present();
  }

  changeDiscountInput() {
    this.discountInput = false;
  }

  closeSaleItemModal() {
    this.viewCtrl.dismiss();
  }

  saveSaleItem(a) {
    this.saleItemAction = a;
    if (this.siDiscountAmount === "") {
      this.siDiscountAmount = 0;
    }
    if (this.siDescription === "") {
      this.descriptionValid = false;
    } else {
      this.descriptionValid = true;
      if (this.siUnitPrice === "" || this.siUnitPrice === "0"){
        this.unitPriceValid = false;
        } else {

        if (this.percentageTag === false){
            this.siDiscount = this.siDiscountAmount;
            this.siTotalPrice = (this.siUnitPrice * this.siQuantity) - this.siDiscount;
        } else {
            this.siDiscount = this.siDiscountAmount * (this.siUnitPrice * this.siQuantity) / 100;
            this.siTotalPrice = (this.siUnitPrice * this.siQuantity) - this.siDiscount;
        }

        if (this.siTotalPrice <= 0) {
          this.totalPriceValid = false;
        } else {
          this.unitPriceValid = true;
          let saleItemData = {
            index: this.saleItemIndex,
            description: this.siDescription,
            quantity: this.siQuantity,
            unitPrice: this.siUnitPrice,
            saleItemTag: this.saleItemAction,
            saleDiscountType: this.saleDiscountType,
            saleDiscountTag: this.percentageTag,
            saleDiscountAmount: this.siDiscountAmount,
            saleDiscount: this.siDiscount,
            siCategory: this.siCategory,
            itemKey: this.myItemKey,
          };
          this.viewCtrl.dismiss(saleItemData);
        }
        }
      }
  }

  updateItemStock(a) {
    if (a != "Delete") {
      if (this.myItemStock) {
        this.myItemStock = +this.myItemStock - +this.siQuantity + +this.myItemQtyBF;
        this.reportsProvider.updateItemStock(this.bizProfile.companyAdmin, this.myItemStock, this.siCategory, this.myItemKey).then(() => {
        });
      } else {
        this.reportsProvider.getItemStock(this.bizProfile.companyAdmin, this.siCategory, this.myItemKey).then( itemsRem => {
          this.myItemStock = itemsRem - +this.siQuantity + +this.myItemQtyBF;
        }).then(()=>{
          this.reportsProvider.updateItemStock(this.bizProfile.companyAdmin, this.myItemStock, this.siCategory, this.myItemKey).then(() => {
          });
        })

      }
    }

    if (a === "Delete") {
      this.reportsProvider.getItemStock(this.bizProfile.companyAdmin, this.siCategory, this.myItemKey).then( itemsRem => {
        this.myItemStock = itemsRem + +this.myItemQtyBF;
      }).then(()=>{
        this.reportsProvider.updateItemStock(this.bizProfile.companyAdmin, this.myItemStock, this.siCategory, this.myItemKey).then(() => {
        });
      })
    }
  }

  addSaleItem(a) {
    this.updateItemStock(a);
    this.saveSaleItem(a);
  }

  updateSaleItem(a) {
    this.updateItemStock(a);
    this.saveSaleItem(a);
  }

  deleteSaleItem(a) {
    this.updateItemStock(a);
    this.saveSaleItem(a);
  }

}
