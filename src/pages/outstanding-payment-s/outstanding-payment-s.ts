import { Component } from '@angular/core';
import {FabContainer, IonicPage, ModalController, NavController} from 'ionic-angular';
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {TeamProvider} from "../../providers/team/team";
import {DateFsProvider} from "../../providers/date-fs/date-fs";


@IonicPage()
@Component({
  selector: 'page-outstanding-payment-s',
  templateUrl: 'outstanding-payment-s.html',
})
export class OutstandingPaymentSPage {

  noOutsPymts: boolean;
  allOutsPymts: Array<any> = [];
  outsPymtsTotal: number = 0;
  companyID: any;
  userProfile: any;
  overlayHidden: boolean;
  currentDate: any;

  constructor(private navCtrl: NavController, private transactionProvider: TransactionsProvider,
              private teamProvider: TeamProvider, private modalCtrl: ModalController, private dfs: DateFsProvider) {
  }

  ionViewDidLoad() {
    this.overlayHidden = true;
    this.userProfile = this.teamProvider.userP;
    this.companyID = this.userProfile.companyId;
    this.outsPymts(this.companyID, "FullyPaid", false);
    this.currentDate = this.dfs.dateNowFS;
  }

  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }

  outstxnDetails(txn) {
    let myViewTransactionDetailsModal = this.modalCtrl.create('TransactionDetailsViewModalPage', {txn: txn, opp: true});
    myViewTransactionDetailsModal.present();
  }

  outsPymts(ID, PI, PV) {
      this.allOutsPymts = [];

      this.transactionProvider.getOutsTxns(ID, PI, PV).subscribe( data => {
        this.allOutsPymts = data;
        if (this.allOutsPymts.length === 0) {
          this.noOutsPymts = true;
          this.outsPymtsTotal = 0;
        } else {
          this.noOutsPymts = false;
          this.outsPymtsTotal = 0;
          for (let txn of this.allOutsPymts){
            this.outsPymtsTotal = (+this.outsPymtsTotal) + (+txn.UnPaidAmount);
          }
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
