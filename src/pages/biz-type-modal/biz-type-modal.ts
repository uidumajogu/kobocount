import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { reorderArray } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-biz-type-modal',
  templateUrl: 'biz-type-modal.html',
})
export class BizTypeModalPage {
  public bTypes: Array<string>;
  public myBType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.bTypes = [ 'IT',
      'Tailor',
      'Club',
      'Craftsperson',
      'Designer/fashion',
      'Musician',
      'Church',
      'Charity',
      'Advertising/Public Relation',
      'Legal Services',
      'Retailer',
      'Event Planer',
      'Wholesale distributor',
      'Pastries and Food',
      'Educational Services'
    ];
    this.bTypes.sort();
  }

  ionViewDidLoad() {}

  reorderItems(indexes) {
    this.bTypes = reorderArray(this.bTypes, indexes);
  }

  // closeBizTypeModal() {
  //   this.viewCtrl.dismiss();
  // }

  submitBizTypeModal(){
    this.viewCtrl.dismiss(this.myBType);
  }

}
