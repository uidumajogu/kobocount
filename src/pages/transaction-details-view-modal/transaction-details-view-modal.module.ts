import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionDetailsViewModalPage } from './transaction-details-view-modal';

@NgModule({
  declarations: [
    TransactionDetailsViewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionDetailsViewModalPage),
  ],
  exports: [
    TransactionDetailsViewModalPage
  ]
})
export class TransactionDetailsViewModalPageModule {}
